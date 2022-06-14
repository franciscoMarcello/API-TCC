/*
  Warnings:

  - You are about to drop the column `ativict` on the `tecnic` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "chamados" ADD COLUMN     "tecnic" TEXT;

-- AlterTable
ALTER TABLE "tecnic" DROP COLUMN "ativict";
