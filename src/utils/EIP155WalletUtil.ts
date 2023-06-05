import EIP155Lib from '@/lib/EIP155Lib'
import axios from 'axios'

export let wallet1: EIP155Lib
export let wallet2: EIP155Lib
export let eip155Wallets: Record<string, EIP155Lib>
export let eip155Addresses: string[]

let address1: string
let address2: string

/**
 * Utilities
 */
export async function createOrRestoreEIP155Wallet() {
  const tempAddress1 = localStorage.getItem('tempAddress1')
  const tempAddress2 = localStorage.getItem('tempAddress2')

  if (tempAddress1 && tempAddress2) {
    const tempWallet1 = await axios.post('/api/account', { address: tempAddress1 })
    const tempWallet2 = await axios.post('/api/account', { address: tempAddress2 })
    wallet1 = EIP155Lib.init({ mnemonic: tempWallet1.data.mnemonic })
    wallet2 = EIP155Lib.init({ mnemonic: tempWallet2.data.mnemonic })
  } else {
    const tempWallet1 = await axios.post('/api/account', { address: null })
    const tempWallet2 = await axios.post('/api/account', { address: null })
    wallet1 = EIP155Lib.init({ mnemonic: tempWallet1.data.mnemonic })
    wallet2 = EIP155Lib.init({ mnemonic: tempWallet2.data.mnemonic })

    // Don't store mnemonic in local storage in a production project!
    localStorage.setItem('tempAddress1', wallet1.getAddress())
    localStorage.setItem('tempAddress2', wallet2.getAddress())
  }

  address1 = wallet1.getAddress()
  address2 = wallet2.getAddress()

  eip155Wallets = {
    [address1]: wallet1,
    [address2]: wallet2
  }
  eip155Addresses = Object.keys(eip155Wallets)

  return {
    eip155Wallets,
    eip155Addresses
  }
}
