import { PrismaClient } from "@prisma/client";
import express from "express";
import { valid } from "joi";
const router = express.Router();
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const TOKEN_KEY = process.env.TOKEN_KEY;

router.get("/", async (req, res) => {
  const monitores = await prisma.monitor.findMany({});
  res.json(monitores);
});

router.get("/:id", async (req, res) => {
  const monitor = await prisma.monitor.findMany({
    where: { id: { in: [Number(req.params.id)] } },
  });
  res.json(monitor);
});

router.post("/register", async (req, res) => {
  try {
    const { nome, email, senha, numero, cursoId, materiaId } = req.body;
    const foto =
      "https://raw.githubusercontent.com/nandowastaken/icons-storage/main/profile/no_profile_picture_blue.png";

    if (!(email && senha && nome && cursoId && materiaId && numero)) {
      res.status(400).json({ message: "Preencha todos os campos." });
    }

    const checkUser = await prisma.monitor.findUnique({
      where: {
        email: email,
      },
    });

    // Add here code to avoid create more than one user
    if (checkUser?.nome) {
      return res.status(409).json({ mensagem: "O usuário já existe." });
    }

    const salt = await bcrypt.genSalt(10);
    const encryptedPassword = await bcrypt.hash(senha, salt);

    const newMonitor = await prisma.monitor.create({
      data: {
        nome: nome,
        email: email,
        senha: encryptedPassword,
        numero: numero,
        foto: foto,
        materiaId: Number(materiaId),
        cursoId: Number(cursoId),
      },
    });

    const token = jwt.sign({ userId: newMonitor.id }, TOKEN_KEY, {
      expiresIn: "72h",
    });

    res.status(201).json({ token, newMonitor });
  } catch (err) {
    console.log(err);
    res.status(500).json({ mensagem: "Erro interno do servidor." });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, senha } = req.body;
    if (!(email && senha)) {
      return res.status(400).json({ mensagem: "Preencha todos os campos." });
    }

    const monitor = await prisma.monitor.findUnique({
      where: {
        email: email,
      },
    });

    if (!monitor?.email) {
      return res.status(401).json({ mensagem: "E-mail não existe." });
    }

    const validPassword = await bcrypt.compare(senha, monitor.senha);

    if (!validPassword) {
      return res.status(401).json({ mensagem: "Senha incorreta." });
    }

    const token = jwt.sign({ userId: monitor.id }, TOKEN_KEY, {
      expiresIn: "72h",
    });

    res.status(200).json({ token });
  } catch (err) {
    console.log(err);
    res.status(500).json({ mensagem: "Erro interno do servidor." });
  }
});

router.delete('/:id', async (req, res) => {
    const deleteMonitor = await prisma.monitor.delete({
        where: {
            id: Number(req.params.id)
        }
    })
})

module.exports = router;
