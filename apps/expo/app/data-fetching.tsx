import { Stack } from 'expo-router'

import { DataFetchingScreen } from 'app/features/data-fetching/screen'

export default function Screen() {
  return (
    <>
      <Stack.Screen
        options={{
          title: 'Data Fetching',
        }}
      />
      <DataFetchingScreen />
    </>
  )
}
