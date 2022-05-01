/*
  Warnings:

  - You are about to drop the column `tecnicId` on the `chamados` table. All the data in the column will be lost.
  - You are about to drop the column `tecnicId` on the `endereco` table. All the data in the column will be lost.
  - You are about to drop the `tecnic` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "chamados" DROP CONSTRAINT "chamados_tecnicId_fkey";

-- DropForeignKey
ALTER TABLE "endereco" DROP CONSTRAINT "endereco_tecnicId_fkey";

-- AlterTable
ALTER TABLE "chamados" DROP COLUMN "tecnicId";

-- AlterTable
ALTER TABLE "endereco" DROP COLUMN "tecnicId";

-- DropTable
DROP TABLE "tecnic";
