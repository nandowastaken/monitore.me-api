import { PrismaClient } from '@prisma/client'
import express from "express";
const router = express.Router();
const prisma = new PrismaClient();

router.get("/", async (req, res) => {
    const horarios = await prisma.horario.findMany({})
    res.json(horarios);
})

router.get("/:monitor_id", async (req, res) => {
    const horarios = await prisma.horario.findMany({
        where: { monitor_id: { in: [Number(req.params.monitor_id)] } },
    })

    res.json(horarios);
 });

 router.post("/register", async (req, res) => {
    try {
        const { monitor_id, horarioSegundaInicio, 
                horarioSegundaFinal, horarioTercaInicio, 
                horarioTercaFinal, horarioQuartaInicio, horarioQuartaFinal,
                horarioQuintaInicio, horarioQuintaFinal, 
                horarioSextaInicio, horarioSextaFinal } = req.body;
        
        if ((monitor_id && horarioSegundaInicio && horarioSegundaFinal && 
            horarioTercaInicio && horarioTercaFinal && horarioQuartaInicio 
            && horarioQuartaFinal && horarioQuintaInicio && horarioQuintaFinal 
            && horarioSextaInicio && horarioSextaFinal) == null) {
            res.status(400).json({ message: "Preencha todos os campos." });
        }

        const newHorario = await prisma.horario.create({
            data: {
                monitor_id: Number(monitor_id),
                horarioSegundaInicio: horarioSegundaInicio,
                horarioSegundaFinal: horarioSegundaFinal,
                horarioTercaInicio: horarioTercaInicio,
                horarioTercaFinal: horarioTercaFinal,
                horarioQuartaInicio: horarioQuartaInicio,
                horarioQuartaFinal: horarioQuartaFinal,
                horarioQuintaInicio: horarioQuintaInicio,
                horarioQuintaFinal: horarioQuintaFinal,
                horarioSextaInicio: horarioSextaInicio,
                horarioSextaFinal: horarioSextaFinal
            },
        });

        res.status(200).json(newHorario);
    } catch (error) {
        res.status(500).json({ message: "Erro ao criar horário." });
    }
});
  
module.exports = router;
  