import { HistoryData } from '@/pages/api/get-history'
import { truncate, truncateWalletAddress } from '@/utils/HelperUtil'
import { Avatar, Button, Card, Link, Text, Tooltip } from '@nextui-org/react'
import Image from 'next/image'

/**
 * Types
 */
interface IProps {
  logo?: string
  name?: string
  url?: string
  onDelete: (data: HistoryData) => Promise<void>
  historyData: HistoryData[]
}

/**
 * Component
 */
export default function PairingCard({ url, onDelete, historyData }: IProps) {
  return <>
    {
      historyData.map((data) => (
        <Card
          key={data.wallet.id}
          bordered
          borderWeight="light"
          css={{
            position: 'relative',
            marginBottom: '$6',
            minHeight: '70px'
          }}
        >
          <Card.Body
            css={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              overflow: 'hidden'
            }}
          >
            <Avatar src={'/chain-logos/eip155-1.png'} />
            <div style={{ flex: 1 }}>
              <Text h5 css={{ marginLeft: '$9' }}>
                {truncateWalletAddress(data.wallet.address)}
              </Text>
              <Text css={{ marginLeft: '$9' }}>
                {data.history.type}
              </Text>
            </div>
            <Tooltip content="Detail" placement="left">
              <Button size="sm" color="secondary" flat onClick={() => onDelete(data)} css={{ minWidth: 'auto' }}>
                <Image src={'/icons/sessions-icon.svg'} width={15} height={15} alt="delete icon" />
              </Button>
            </Tooltip>
          </Card.Body>
        </Card>
      ))
    }
  </>
}
