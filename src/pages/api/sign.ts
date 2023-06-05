import { createHistory, getWalletByAddress } from "@prisma/services";
import { TatumPolygonSDK } from "@tatumio/polygon";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { signType, address, data } = req.body
  try {
    if (!address) {
      return res.status(400).json({
        msg: "address cannot be empty",
        data: null
      })
    }
    const getWallet = await getWalletByAddress(String(address).toLowerCase())
    if (!getWallet) {
      return res.status(400).json({
        msg: "wallet not founc",
        data: null
      })
    }
  
    const newHistory = await createHistory({
      txHash: data,
      type: signType,
      walletId: getWallet.id
    })
  
    return res.status(200).json({
      ...newHistory
    })
  } catch (error: any) {
    console.error(error)
    return res.status(500).json({
      msg: error.message,
      data: null
    })
  }
}