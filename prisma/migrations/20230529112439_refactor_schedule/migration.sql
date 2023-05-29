/*
  Warnings:

  - You are about to drop the `HorarioFinal` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `HorarioInicio` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `horarioQuartaFinal` to the `Horario` table without a default value. This is not possible if the table is not empty.
  - Added the required column `horarioQuartaInicio` to the `Horario` table without a default value. This is not possible if the table is not empty.
  - Added the required column `horarioQuintaFinal` to the `Horario` table without a default value. This is not possible if the table is not empty.
  - Added the required column `horarioQuintaInicio` to the `Horario` table without a default value. This is not possible if the table is not empty.
  - Added the required column `horarioSegundaFinal` to the `Horario` table without a default value. This is not possible if the table is not empty.
  - Added the required column `horarioSegundaInicio` to the `Horario` table without a default value. This is not possible if the table is not empty.
  - Added the required column `horarioSextaFinal` to the `Horario` table without a default value. This is not possible if the table is not empty.
  - Added the required column `horarioSextaInicio` to the `Horario` table without a default value. This is not possible if the table is not empty.
  - Added the required column `horarioTercaFinal` to the `Horario` table without a default value. This is not possible if the table is not empty.
  - Added the required column `horarioTercaInicio` to the `Horario` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "HorarioFinal" DROP CONSTRAINT "HorarioFinal_horarioId_fkey";

-- DropForeignKey
ALTER TABLE "HorarioInicio" DROP CONSTRAINT "HorarioInicio_horarioId_fkey";

-- AlterTable
ALTER TABLE "Horario" ADD COLUMN     "horarioQuartaFinal" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "horarioQuartaInicio" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "horarioQuintaFinal" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "horarioQuintaInicio" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "horarioSegundaFinal" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "horarioSegundaInicio" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "horarioSextaFinal" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "horarioSextaInicio" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "horarioTercaFinal" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "horarioTercaInicio" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Monitor" ADD COLUMN     "horarioId" INTEGER;

-- DropTable
DROP TABLE "HorarioFinal";

-- DropTable
DROP TABLE "HorarioInicio";

-- AddForeignKey
ALTER TABLE "Monitor" ADD CONSTRAINT "Monitor_horarioId_fkey" FOREIGN KEY ("horarioId") REFERENCES "Horario"("id") ON DELETE SET NULL ON UPDATE CASCADE;
