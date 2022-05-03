/*
  Warnings:

  - You are about to drop the column `images` on the `chamados` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "chamados" DROP CONSTRAINT "chamados_tecnicId_fkey";

-- AlterTable
ALTER TABLE "chamados" DROP COLUMN "images",
ALTER COLUMN "tecnicId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "chamados" ADD CONSTRAINT "chamados_tecnicId_fkey" FOREIGN KEY ("tecnicId") REFERENCES "tecnic"("id") ON DELETE SET NULL ON UPDATE CASCADE;
