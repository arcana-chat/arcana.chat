import { Stack } from 'expo-router'

import { InfiniteListScreen } from 'app/features/infinite-list/screen'

export default function Screen() {
  return (
    <>
      <Stack.Screen
        options={{
          title: 'Infinite List',
        }}
      />
      <InfiniteListScreen />
    </>
  )
}
