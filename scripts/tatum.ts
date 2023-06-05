import { TatumPolygonSDK } from '@tatumio/polygon'

async function main() {
  const tatumSdk = TatumPolygonSDK({ apiKey: "b0305cf5-d769-42d1-8281-0492d370794c" })
  const { mnemonic, xpub } = await tatumSdk.wallet.generateWallet()
  const address = await tatumSdk.wallet.generateAddressFromXPub(xpub, 0)
  const privkey = await tatumSdk.wallet.generatePrivateKeyFromMnemonic(mnemonic, 0, { testnet: true })
  

  console.log({
    address,
    privkey,
    xpub
  })
}

main().then(() => console.log(`Success executed`)).catch(console.error)