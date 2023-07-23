import 'raf/polyfill'
import '@tamagui/core/reset.css'
import '@tamagui/font-inter/css/400.css'
import '@tamagui/font-inter/css/700.css'

import { NextThemeProvider, useRootTheme } from '@tamagui/next-theme'
import { Provider, initialWindowMetrics } from 'app/provider'
import { trpc } from 'app/utils/trpc/index.web'
import Head from 'next/head'
import React, { useMemo } from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import type { AppProps } from 'next/app'
import { SolitoImageProvider } from 'solito/image'

if (process.env.NODE_ENV === 'production') {
  require('./tamagui.css')
}

const imageURL = process.env.NEXT_PUBLIC_APP_URL as `https:${string}`

function MyApp({ Component, pageProps }: AppProps) {
  const contents = useMemo(() => {
    // @ts-ignore
    return <Component {...pageProps} />
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageProps])

  return (
    <>
      <Head>
        <title>T4 App</title>
        <meta name="description" content="Tamagui, Solito, Expo & Next.js" />
        <link rel="icon" href="/favicon.ico" />
        <style>{`
          body, #root, #__next {
            min-width: 100% !important;
          }
        `}</style>
      </Head>
      <ThemeProvider>{contents}</ThemeProvider>
    </>
  )
}

function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useRootTheme()

  return (
    <NextThemeProvider
      onChangeTheme={(next) => {
        setTheme(next as any)
      }}
    >
      <Provider defaultTheme={theme}>
        <SolitoImageProvider
          loader={({ quality, width, src }) => `${imageURL}${src}?w=${width}&q=${quality}`}
        >
          <SafeAreaProvider initialMetrics={initialWindowMetrics}>{children}</SafeAreaProvider>
        </SolitoImageProvider>
      </Provider>
    </NextThemeProvider>
  )
}

export default trpc.withTRPC(MyApp)
