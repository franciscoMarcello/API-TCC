import { Request, Response } from "express";
import { prismaClient } from "../database/prismaClient";
export default class ChamadoController {

    async create(req: Request, res: Response) {
        const { title, description, customer_id } = req.body;
        const status = 'Aberto'
        if (!title) {
            res.status(401).json({ message: "O Titulo e obrigatorio" });
            return;
        }
        if (!description) {
            res.status(400).json({ message: "A decrição e obrigatoria" });
            return;
        }
        if (!customer_id) {
            res.status(400).json({ message: "O id do usuario e obrigatoria" });
            return;
        }

        const chamado = await prismaClient.chamado.create({
            data: {
                title,
                status,
                description,
                customer_id
            }
        })

        return res.status(201).json(chamado);
    }
}