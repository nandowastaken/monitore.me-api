import { PrismaClient } from '@prisma/client'
import express from 'express'

const prisma = new PrismaClient()
const app = express()
const cors = require("cors");
const auth = require("./middleware/auth");

// Routes
const monitor = require("./routes/monitor");
const curso = require("./routes/curso");
const materia = require("./routes/materia");
const horario = require("./routes/horario");
const horarioInicial = require("./routes/horarioInicio");
const horarioFinal = require("./routes/horarioFinal");

app.use(express.json())
app.use(cors({}))

// Apply routes
app.use("/monitores", monitor);
app.use("/horarios", horario);
app.use("/materias", materia);
app.use("/cursos", curso);
app.use("/horariosIniciais", horarioInicial);
app.use("/horariosFinais", horarioFinal);


app.post("/welcome", auth, (req, res) => {
  res.status(200).json({ mensagem: "Você fez login!" });
});

/*
app.listen(3000, () =>
  console.log('REST API server ready at: http://localhost:3000'),
)
*/