-- RenameForeignKey
ALTER TABLE "Transaction" RENAME CONSTRAINT "Transaction_receivedTransfers_fkey" TO "Transaction_sentTransfers_fkey";

-- RenameForeignKey
ALTER TABLE "Transaction" RENAME CONSTRAINT "Transaction_sentTransfers_fkey" TO "Transaction_receivedTransfers_fkey";
