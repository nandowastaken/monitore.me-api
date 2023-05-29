const request = require("supertest");
const express = require("express");
const horario = require("../routes/horario.ts");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const app = express();
app.use(express.json());
app.use("/", horario);

// Close the Prisma connection after all tests are done
afterAll(async () => {
  await prisma.$disconnect();
});

describe("Horario API", () => {
  describe("GET /", () => {
    it("should get all horarios", async () => {
      const response = await request(app).get("/");
      expect(response.status).toBe(200);
      expect(response.body).toBeDefined();
      expect(Array.isArray(response.body)).toBe(true);
    });
  });

  // Test GET "/:monitor_id"
  describe("GET /:monitor_id", () => {
    it("should get horarios for a specific monitor", async () => {
      const monitorId = 1;
      const response = await request(app).get(`/${monitorId}`);
      expect(response.status).toBe(200);
      expect(response.body).toBeDefined();
      expect(Array.isArray(response.body)).toBe(true);
    });
  });

  describe("POST /register", () => {
    it("should create a new horario", async () => {
      const newHorario = {
        monitor_id: 7, // Mudar o id do monitor para realizar um novo teste, uma vez que  esse é único
        horarioSegundaInicio: "2023-05-29T09:00:00Z",
        horarioSegundaFinal: "2023-05-29T11:00:00Z",
        horarioTercaInicio: "2023-05-30T13:00:00Z",
        horarioTercaFinal: "2023-05-30T15:00:00Z",
        horarioQuartaInicio: "2023-05-31T10:30:00Z",
        horarioQuartaFinal: "2023-05-31T12:30:00Z",
        horarioQuintaInicio: "2023-06-01T14:00:00Z",
        horarioQuintaFinal: "2023-06-01T16:00:00Z",
        horarioSextaInicio: "2023-06-02T08:00:00Z",
        horarioSextaFinal: "2023-06-02T10:00:00Z",
      };

      const response = await request(app).post("/register").send(newHorario);

      expect(response.status).toBe(200);
      expect(response.body).toBeDefined();
    });
  });
});
