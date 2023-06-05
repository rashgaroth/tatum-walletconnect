import { History, Wallet } from "@prisma/client";
import { getHistories, getWalletByAddress } from "@prisma/services";
import { NextApiRequest, NextApiResponse } from "next";

export type HistoryData = {
  history: History;
  wallet: Wallet;
  assignedAt: string;
}

export type HistoryResponse = {
  data: HistoryData[]
  msg: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { address } = req.query
    const wallet = await getWalletByAddress(String(address).toLowerCase())
    if (wallet) {
      const histories = await getHistories(wallet.id)
      return res.status(200).send({
        msg: "success",
        data: histories
      })
    }
    return res.status(200).send({
      msg: "No wallet found",
      data: []
    })
  } catch (error: any) {
    return res.status(500).send({
      msg: error.message || "Unknown error",
      data: null
    })
  }
}