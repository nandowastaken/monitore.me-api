import { PrismaClient } from '@prisma/client'
import express from "express";
const router = express.Router();
const prisma = new PrismaClient()

// Meu sistema requer que eu procure um horário que tem um monitor que satisfaça um curso, um turno e uma matéria
// Fazer mudança em horario e acrescentar um atributo turno para identificar isso
  
module.exports = router;
  