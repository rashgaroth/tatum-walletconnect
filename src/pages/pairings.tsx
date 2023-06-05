import PageHeader from '@/components/PageHeader'
import PairingCard from '@/components/PairingCard'
import SettingsStore from '@/store/SettingsStore'
import { signClient } from '@/utils/WalletConnectUtil'
import { Button, Modal, Text } from '@nextui-org/react'
import { getSdkError } from '@walletconnect/utils'
import axios from 'axios'
import { Fragment, useEffect, useState } from 'react'
import { useSnapshot } from 'valtio'
import { HistoryData, HistoryResponse } from './api/get-history'

export default function PairingsPage() {
  const { account, eip155Address } = useSnapshot(SettingsStore.state)
  const [pairings, setPairings] = useState(signClient.pairing.values)
  const [history, setHistory] = useState<HistoryData[]>([])
  const [tmpHistory, setTmpHistory] = useState<HistoryData | null>(null)
  const [openModal, setOpenModal] = useState(false)

  async function onDelete(topic: string) {
    await signClient.disconnect({ topic, reason: getSdkError('USER_DISCONNECTED') })
    const newPairings = pairings.filter(pairing => pairing.topic !== topic)
    setPairings(newPairings)
  }

  useEffect(() => {
    const getHistory = async () => {
      try {
        const historyData = await axios.get<HistoryResponse>(`/api/get-history?address=${eip155Address}`)
        console.log(historyData)
        setHistory(historyData.data.data)
      } catch (error) {
        console.error(error)
      }
    }

    if (eip155Address) {
      getHistory()
    }
  }, [eip155Address])

  return (
    <Fragment>
      <PageHeader title="History" />
      {history.length ? (
        <PairingCard
          historyData={history}
          onDelete={async (data) => {
            setTmpHistory(data)
            setOpenModal(true)
          }}
        />
      ) : (
        <Text css={{ opacity: '0.5', textAlign: 'center', marginTop: '$20' }}>No history</Text>
      )}

      <Modal
        closeButton
        aria-labelledby="modal-title"
        open={openModal}
        onClose={
          () => setOpenModal(false)
        }
      >
        <Modal.Header>
          <Text id="modal-title" size={18}>
              History Detail
          </Text>
        </Modal.Header>
        <Modal.Body>
          <Text size={18}>Data</Text>
          <Text size={15} css={{ width: 350, overflowX: 'inherit' }}>{tmpHistory?.history.txHash}</Text>
          <Text size={18}>Created date</Text>
          <Text size={15}>{new Date(tmpHistory?.assignedAt as any).toLocaleDateString()}</Text>
          <Text size={18}>Address</Text>
          <Text size={15}>{tmpHistory?.wallet.address}</Text>
        </Modal.Body>
        <Modal.Footer>
          <Button auto flat color="error" onPress={() => setOpenModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Fragment>
  )
}
