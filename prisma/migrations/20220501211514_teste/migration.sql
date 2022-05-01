-- DropForeignKey
ALTER TABLE "chamados" DROP CONSTRAINT "chamados_tecnicId_fkey";

-- DropForeignKey
ALTER TABLE "endereco" DROP CONSTRAINT "endereco_customerId_fkey";

-- DropForeignKey
ALTER TABLE "endereco" DROP CONSTRAINT "endereco_tecnicId_fkey";

-- AlterTable
ALTER TABLE "chamados" ALTER COLUMN "tecnicId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "endereco" ALTER COLUMN "customerId" DROP NOT NULL,
ALTER COLUMN "tecnicId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "endereco" ADD CONSTRAINT "endereco_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "customers"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "endereco" ADD CONSTRAINT "endereco_tecnicId_fkey" FOREIGN KEY ("tecnicId") REFERENCES "tecnic"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "chamados" ADD CONSTRAINT "chamados_tecnicId_fkey" FOREIGN KEY ("tecnicId") REFERENCES "tecnic"("id") ON DELETE SET NULL ON UPDATE CASCADE;
