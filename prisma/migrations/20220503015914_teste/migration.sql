/*
  Warnings:

  - Added the required column `tecnicId` to the `chamados` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "chamados" ADD COLUMN     "tecnicId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "chamados" ADD CONSTRAINT "chamados_tecnicId_fkey" FOREIGN KEY ("tecnicId") REFERENCES "tecnic"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
