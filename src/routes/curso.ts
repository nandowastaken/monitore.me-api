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
  
  module.exports = router;
  