import SettingsStore from '@/store/SettingsStore'
import { createOrRestoreEIP155Wallet } from '@/utils/EIP155WalletUtil'
import { createSignClient, signClient } from '@/utils/WalletConnectUtil'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useSnapshot } from 'valtio'

export default function useInitialization() {
  const [initialized, setInitialized] = useState(false)
  const prevRelayerURLValue = useRef<string>('')

  const { relayerRegionURL } = useSnapshot(SettingsStore.state)

  const onInitialize = useCallback(async () => {
    try {
      const { eip155Addresses } = await createOrRestoreEIP155Wallet()

      SettingsStore.setEIP155Address(eip155Addresses[0])
      await createSignClient(relayerRegionURL)
      setInitialized(true)
    } catch (err: unknown) {
      alert(err)
    }
  }, [relayerRegionURL])

  // restart transport if relayer region changes
  const onRelayerRegionChange = useCallback(() => {
    try {
      signClient.core.relayer.restartTransport(relayerRegionURL)
      prevRelayerURLValue.current = relayerRegionURL
    } catch (err: unknown) {
      alert(err)
    }
  }, [relayerRegionURL])

  useEffect(() => {
    if (!initialized) {
      onInitialize()
    }
    if (prevRelayerURLValue.current !== relayerRegionURL) {
      onRelayerRegionChange()
    }
  }, [initialized, onInitialize, relayerRegionURL, onRelayerRegionChange])

  return initialized
}
