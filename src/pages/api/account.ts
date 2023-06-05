import { createWallet, findWalletByAddress } from "@prisma/services";
import { TatumPolygonSDK } from "@tatumio/polygon";
import { Wallet } from "ethers";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { address } = req.body
  try {
    if (!address) {
      const newWallet = Wallet.createRandom()
  
      const tatumSdk = TatumPolygonSDK({ apiKey: process.env.TATUM_API_KEY as string })
      const { mnemonic: tMnemonic, xpub } = await tatumSdk.wallet.generateWallet()
      const tAddress = await tatumSdk.wallet.generateAddressFromXPub(xpub, 0)
      const tPrivkey = await tatumSdk.wallet.generatePrivateKeyFromMnemonic(tMnemonic, 0, { testnet: true })
  
      await createWallet({
        address: newWallet.address.toLowerCase(),
        mnemonic: newWallet.mnemonic.phrase,
        privateKey: newWallet.privateKey,
        tatum_address: tAddress,
        tatum_privateKey: tPrivkey,
        tatum_mnemonic: tMnemonic,
        tatum_xpub: xpub
      })
      return res.status(200).json({
        mnemonic: newWallet.mnemonic.phrase,
        address: newWallet.address,
        tatum_address: tAddress,
        tatum_xpub: xpub
      })
    }
    const tempWallet = await findWalletByAddress(String(address).toLowerCase())
    return res.status(200).json({
      mnemonic: tempWallet?.mnemonic,
      address: tempWallet?.address,
      tatum_address: tempWallet?.tatum_address,
      tatum_xpub: tempWallet?.tatum_xpub
    })
  } catch (error: any) {
    return res.status(500).json({
      msg: error?.message || "Unknown error",
      data: null
    })
  }
}