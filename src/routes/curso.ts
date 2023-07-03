import { PrismaClient } from '@prisma/client'
import express from "express";
const router = express.Router();
const prisma = new PrismaClient()

router.get('/', async (req, res) => {
    const cursos = await prisma.curso.findMany({})
    res.json(cursos);
})

router.get('/:id', async (req, res) => {
    const curso = await prisma.curso.findMany({
        where: {id: { in: [Number(req.params.id)]}}
    })
    res.json(curso);
})

router.post('/', async (req, res) => {
    try {
        const { nome } = req.body;
        const curso = await prisma.curso.create({
            data: {
                nome: nome
            }
        })

        res.json({curso})
    } catch {
        res.status(500).json({error: "Não foi possível criar o curso"})
    }
})
  
  module.exports = router;
  