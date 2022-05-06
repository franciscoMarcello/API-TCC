import { Request, Response } from "express";
import { prismaClient } from "../database/prismaClient";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
class TecnicController {
    async create(req: Request, res: Response) {
        const {
            name,
            email,
            password,
            phone,
            street,
            number,
            city,
            complement,
            cep,
        } = req.body;

        if (!name) {
            res.status(401).json({ message: "O nome e obrigatorio" });
            return;
        }
        const emailExist = await prismaClient.tecnic.findFirst({
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
        const phoneExist = await prismaClient.tecnic.findFirst({
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
        if (!street) {
            res.status(400).json({ message: "A rua e obrigatorio" });
            return;
        }
        if (!city) {
            res.status(400).json({ message: "A cidade e obrigatoria" });
            return;
        }
        if (!number) {
            res.status(400).json({ message: "O numero e obrigatorio" });
            return;
        }
        if (!cep) {
            res.status(400).json({ message: "O cep e obrigatorio" });
            return;
        }

        const tecnic = await prismaClient.tecnic.create({
            data: {
                email,
                passwordHash,
                phone,
                name,
                picture: "",
                endereco: {
                    create: { street, number, city, complement, cep },
                },
            },
            select: {
                id: true,
                name: true,
                email: true,
                phone: true,
                endereco: true,
            },
        });

        return res.status(201).json({ tecnic });
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
        const user = await prismaClient.tecnic.findFirst({
            where: { email: email },
        });
        if (!user) {
            return res.status(401).json({ message: "Usuário não cadastrado!" });
        }

        const isValidPassword = await bcryptjs.compare(password, user.passwordHash);

        if (!isValidPassword) {
            res.status(401).json({ message: "O usuário/senha esta incorreta!" });
        }
        const token = jwt.sign(
            { name: user.name, email: email },
            `${process.env.SECRET}`,
            {
                subject: user.id,
                expiresIn: "7d",
            }
        );

        return res.json({
            email: email,
            name: user.name,
            phone: user.phone,
            token,
        });
    }

}
export { TecnicController };
