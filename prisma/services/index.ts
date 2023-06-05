import { History, PrismaClient, Wallet } from '@prisma/client';

const prisma = new PrismaClient();

export type CreateWalletPayload = {
  address: string; 
  mnemonic: string; 
  privateKey: string;
  tatum_address: string;
  tatum_mnemonic: string;
  tatum_privateKey: string;
  tatum_xpub: string
}

export const createWallet = async ({ address, mnemonic, privateKey, tatum_address, tatum_mnemonic, tatum_privateKey, tatum_xpub }: CreateWalletPayload) => {
  return await prisma.wallet.create({
    data: {
      address,
      mnemonic,
      privateKey,
      tatum_address,
      tatum_mnemonic,
      tatum_privateKey,
      tatum_xpub
    }
  })
}

export const findWalletByAddress = async (address: string) => {
  return await prisma.wallet.findUnique({
    where: {
      address
    }
  })
}

export const createHistory = async ({ txHash, type, walletId }: { txHash: string; type: string, walletId: string }) => {
  const history = await prisma.history.create({
    data: {
      txHash,
      type
    }
  })
  return await prisma.walletHistories.create({
    data: {
      history: {
        connect: {
          id: history.id
        }
      },
      wallet: {
        connect: {
          id: walletId
        }
      }
    }
  })
}

export const getWalletByAddress = async (address: string) => {
  return await prisma.wallet.findFirst({
    where: {
      address
    }
  })
}

export const getHistories = async (walletId: string) => {
  return await prisma.walletHistories.findMany({
    where: {
      walletId
    },
    select: {
      wallet: true,
      history: true,
      assignedAt: true,
    }
  })
}