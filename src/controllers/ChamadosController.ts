import { prisma } from "@prisma/client";
import { Request, Response } from "express";
import { prismaClient } from "../database/prismaClient";
class ChamadoController {
  async create(req: Request, res: Response) {
    const { title, description, customerId, category } = req.body;

    const status = "Aberto";
    if (!title) {
      res.status(401).json({ message: "O Titulo e obrigatorio" });
      return;
    }
    if (!description) {
      res.status(400).json({ message: "A decrição e obrigatoria" });
      return;
    }
    if (!customerId) {
      res.status(400).json({ message: "O id do usuario e obrigatoria" });
      return;
    }
    if (!category) {
      res.status(400).json({ message: "A categoria e obrigatoria" });
      return;
    }

    const chamado = await prismaClient.chamado.create({
      data: {
        title,
        status,
        description,
        customerId,
        category,
      },
    });

    return res.status(201).json(chamado);
  }
  async assumir(req: Request, res: Response) {

    const { customerId, chamadoId } = req.body
    const customerChamado =await prismaClient.chamado.findFirst({
      where:{id:chamadoId}
    })
    
    if(customerChamado!.customerId === customerId){
      res.status(422).json({message:"Voce não pode assumir seu proprio chamado"})
    }
    const tecnic = await prismaClient.customer.findFirst({
      where:{id:customerId,}})
      if(!tecnic!.tecnicId){
        res.status(400).json({message:"Voce não e um tecnico"})
        return
      }
      
    const chamado = await prismaClient.chamado.update({
      where: {
        id: chamadoId
      },
      data: {
        tecnic:customerId,
        status: "Em atendimento"
      },
      include: {
        customer: {
          select: {
            name: true,
            email: true,
            phone: true
          }
        }
      },


    })
    res.status(200).json(chamado)

  }
  async chamados(req: Request, res: Response) {
    const chamados = await prismaClient.chamado.findMany()

    return res.status(200).json(chamados)
  }
  async details(req: Request, res: Response) {
    const { chamadoId } = req.body
    const chamado = await prismaClient.chamado.findFirst({
      where: {
        id: chamadoId
      },
      include: {
        customer: {
          select: {
            email: true,
            name: true,
            phone: true
          }
        }


      }

    })
    return res.status(200).json(chamado)
  }

}

export { ChamadoController };
