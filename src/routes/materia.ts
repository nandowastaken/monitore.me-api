import { PrismaClient } from '@prisma/client'
import express from "express";
const router = express.Router();
const prisma = new PrismaClient()

router.get('/', async (req, res) => {
    const materias = await prisma.materia.findMany({})
    res.json(materias);
})

router.get('/:id', async (req, res) => {
    const materia = await prisma.materia.findMany({
        where: {id: Number(req.params.id)}
    })
    res.json(materia);
})

router.post('/', async (req, res) => {
    const { nome, cursoId } = req.body;
    const materia = await prisma.materia.create({
        data: {
            nome: nome,
            cursoId: cursoId
        }
    })

    res.json({materia})
})
  
module.exports = router;
  