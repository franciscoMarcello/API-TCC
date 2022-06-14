/*
  Warnings:

  - You are about to drop the column `tecnicId` on the `endereco` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `tecnic` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `tecnic` table. All the data in the column will be lost.
  - You are about to drop the column `passwordHash` on the `tecnic` table. All the data in the column will be lost.
  - You are about to drop the column `phone` on the `tecnic` table. All the data in the column will be lost.
  - You are about to drop the column `picture` on the `tecnic` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[custumerId]` on the table `tecnic` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `custumerId` to the `tecnic` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "endereco" DROP CONSTRAINT "endereco_tecnicId_fkey";

-- DropIndex
DROP INDEX "tecnic_email_key";

-- DropIndex
DROP INDEX "tecnic_phone_key";

-- AlterTable
ALTER TABLE "customers" ADD COLUMN     "tecnicId" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "endereco" DROP COLUMN "tecnicId";

-- AlterTable
ALTER TABLE "tecnic" DROP COLUMN "email",
DROP COLUMN "name",
DROP COLUMN "passwordHash",
DROP COLUMN "phone",
DROP COLUMN "picture",
ADD COLUMN     "custumerId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "tecnic_custumerId_key" ON "tecnic"("custumerId");

-- AddForeignKey
ALTER TABLE "tecnic" ADD CONSTRAINT "tecnic_custumerId_fkey" FOREIGN KEY ("custumerId") REFERENCES "customers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
