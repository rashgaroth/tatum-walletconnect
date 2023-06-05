-- CreateEnum
CREATE TYPE "SigningMethod" AS ENUM ('PERSONAL_SIGN', 'ETH_SIGN', 'ETH_SIGN_TRANSACTION', 'ETH_SIGN_TYPED_DATA', 'ETH_SIGN_TYPED_DATA_V3', 'ETH_SIGN_TYPED_DATA_V4', 'ETH_SEND_RAW_TRANSACTION', 'ETH_SEND_TRANSACTION');

-- CreateTable
CREATE TABLE "wallets" (
    "id" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "privateKey" TEXT NOT NULL,
    "mnemonic" TEXT NOT NULL,
    "email" TEXT,
    "username" TEXT,

    CONSTRAINT "wallets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "histories" (
    "id" TEXT NOT NULL,
    "txHash" TEXT NOT NULL,
    "type" TEXT NOT NULL,

    CONSTRAINT "histories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "wallet_histories" (
    "id" TEXT NOT NULL,
    "walletId" TEXT NOT NULL,
    "historyId" TEXT NOT NULL,
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "wallet_histories_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "wallet_histories_walletId_historyId_key" ON "wallet_histories"("walletId", "historyId");

-- AddForeignKey
ALTER TABLE "wallet_histories" ADD CONSTRAINT "wallet_histories_walletId_fkey" FOREIGN KEY ("walletId") REFERENCES "wallets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "wallet_histories" ADD CONSTRAINT "wallet_histories_historyId_fkey" FOREIGN KEY ("historyId") REFERENCES "histories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
