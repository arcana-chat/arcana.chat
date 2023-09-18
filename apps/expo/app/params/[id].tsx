import { Stack } from 'expo-router'

import { ParamsScreen } from 'app/features/params/screen'

export default function Screen() {
  return (
    <>
      <Stack.Screen
        options={{
          title: 'Params',
        }}
      />
      <ParamsScreen />
    </>
  )
}
