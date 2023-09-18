import { useEffect } from 'react'
import { useColorScheme } from 'react-native'

import { useFonts } from 'expo-font'
import { SplashScreen, Stack } from 'expo-router'
import { SolitoImageProvider } from 'solito/image'

import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native'

import { Provider } from 'app/provider'




export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router'

const imageURL = process.env.NEXT_PUBLIC_APP_URL as `http:${string}` | `https:${string}`

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
  const colorScheme = useColorScheme()

  const [loaded, error] = useFonts({
    Inter: require('@tamagui/font-inter/otf/Inter-Medium.otf'),
    InterBold: require('@tamagui/font-inter/otf/Inter-Bold.otf'),
  })

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error
  }, [error])

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync()
    }
  }, [loaded])

  if (!loaded) {
    return null
  }

  return (
    <Provider>
      {/* Uncomment if you want to use server optimized images */}
      <SolitoImageProvider nextJsURL={imageURL}>
        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
          <Stack />
        </ThemeProvider>
      </SolitoImageProvider>
    </Provider>
  )
}
