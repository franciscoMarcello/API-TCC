import { Request, Response } from "express";
import { prismaClient } from "../database/prismaClient";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
export class CustomerController {
  async create(req: Request, res: Response) {
    const { name, email, password, phone, street, number, city, complement } = req.body;
    if (!name) {
      res.status(401).json({ message: "O nome e obrigatorio" });
      return;
    }
    const emailExist = await prismaClient.customer.findFirst({
      where: { email: email },
    });
    if (emailExist) {
      res.status(409).json({ message: "O email já esta em uso" });
      return;
    }
    if (!email) {
      res.status(400).json({ message: "O email e obrigatorio" });
      return;
    }
    if (!password) {
      res.status(400).json({ message: "A senha e obrigatoria" });
      return;
    }
    const passwordHash = bcryptjs.hashSync(password, 8);
    const phoneExist = await prismaClient.customer.findFirst({
      where: { phone: phone },
    });
    if (phoneExist) {
      res.status(409).json({ message: "O telefone já esta em uso" });
      return;
    }
    if (!phone) {
      res.status(400).json({ message: "O telefone e obrigatorio" });
      return;
    }
    const customer = await prismaClient.customer.create({
      data: {
        email,
        passwordHash,
        phone,
        name,
      },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
      },
    });
    const endereco = await prismaClient.endereco.create({
      data: {
        street: street, number: number, city: city, complement: complement, customerId: customer.id
      }
    })

    return res.status(201).json({ customer, endereco });
  }
  async auth(req: Request, res: Response) {
    const { email, password } = req.body;
    if (!email) {
      res.status(401).json({ message: "O email e obrigatorio!" });
      return;
    }
    if (!password) {
      res.status(401).json({ message: "A senha e obrigatoria!" });
      return;
    }
    const user = await prismaClient.customer.findFirst({
      where: { email: email },
    });
    if (!user) {
      return res.status(401).json({ message: "Usuário não cadastrado!" });
    }

    const isValidPassword = await bcryptjs.compare(password, user.passwordHash);

    if (!isValidPassword) {
      res.status(401).json({ message: "A senha esta incorreta!" });
    }
    const token = jwt.sign({ name: user.name, email: email }, `${process.env.SECRET}`, {
      subject: user.id,
      expiresIn: "7d",
    });

    return res.json({ email: email, name: user.name, phone: user.phone, token });
  }
}
