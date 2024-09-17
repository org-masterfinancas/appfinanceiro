/*
  Warnings:

  - You are about to alter the column `valorLancamento` on the `LancamentoFinanceiros` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `DoublePrecision`.

*/
-- CreateEnum
CREATE TYPE "StatusLancamento" AS ENUM ('PENDENTE', 'CONSOLIDADO', 'CANCELADO');

-- AlterTable
ALTER TABLE "LancamentoFinanceiros" ALTER COLUMN "valorLancamento" SET DATA TYPE DOUBLE PRECISION;
