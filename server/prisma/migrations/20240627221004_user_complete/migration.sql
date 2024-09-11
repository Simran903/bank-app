
ALTER TABLE "Transaction" DROP CONSTRAINT IF EXISTS "Transaction_sentTransfers_fkey";
ALTER TABLE "Transaction" DROP CONSTRAINT IF EXISTS "Transaction_receivedTransfers_fkey";

ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_sentTransfers_fkey" FOREIGN KEY ("balanceId") REFERENCES "Balance"("id");
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_receivedTransfers_fkey" FOREIGN KEY ("balanceId") REFERENCES "Balance"("id");

