/*
  Warnings:

  - A unique constraint covering the columns `[username]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `accountNumber` to the `Beneficiary` table without a default value. This is not possible if the table is not empty.
  - Added the required column `bankName` to the `Beneficiary` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ifscCode` to the `Beneficiary` table without a default value. This is not possible if the table is not empty.
  - Added the required column `username` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Transaction" DROP CONSTRAINT "Transaction_receivedTransfers_fkey";

-- DropForeignKey
ALTER TABLE "Transaction" DROP CONSTRAINT "Transaction_sentTransfers_fkey";

-- DropIndex
DROP INDEX "Beneficiary_accountId_name_key";

-- AlterTable
ALTER TABLE "Beneficiary" ADD COLUMN     "accountNumber" TEXT NOT NULL,
ADD COLUMN     "bankName" TEXT NOT NULL,
ADD COLUMN     "ifscCode" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "username" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_sentTransfers_fkey" FOREIGN KEY ("balanceId") REFERENCES "Balance"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_receivedTransfers_fkey" FOREIGN KEY ("balanceId") REFERENCES "Balance"("id") ON DELETE SET NULL ON UPDATE CASCADE;
