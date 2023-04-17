import { PrismaClient } from '@prisma/client'
import express from 'express'

const prisma = new PrismaClient()
const app = express()
app.use(express.json())


app.listen(3000, () =>
  console.log('REST API server ready at: http://localhost:3000'),
)

app.get('/users', async (req, res) => {
    const users = await prisma.monitor.findMany()
    res.json(users)
})
  
app.get('/cursos', async (req, res) => {
    const users = await prisma.curso.findMany()
    res.json(users)
})