import { SolitoImage } from 'solito/image'

import { Paragraph, VirtualList, YStack } from '@arcana/ui'

export const InfiniteListScreen = (): React.ReactNode => {
  return <VirtualList data={data} renderItem={Item} itemHeight={80} />
}

interface Item {
  title: string
  index: number
}

const data: Item[] = Array(100)
  .fill(0)
  .map((_, v) => ({ title: `Item ${v + 1}`, index: v }))

const Item = (item: Item): React.ReactElement => {
  return (
    <YStack flexDirection="row" paddingLeft="$2">
      <SolitoImage
        src="/arcana-logo.png"
        width={56}
        height={56}
        alt="T4 Logo"
        style={{
          marginTop: 8,
        }}
      />
      <YStack>
        <Paragraph paddingTop="$2" paddingLeft="$3" paddingBottom="$1" fontSize={16}>
          {'Item ' + item.index}
        </Paragraph>
        <Paragraph paddingLeft="$3" fontSize={16} opacity={0.6}>
          Subtitle
        </Paragraph>
      </YStack>
    </YStack>
  )
}
