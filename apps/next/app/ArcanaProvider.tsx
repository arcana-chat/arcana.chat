'use client';

import '@arcana/ui/fonts.css';
import '@tamagui/core/reset.css';
import '@tamagui/polyfill-dev';

import { NextThemeProvider, useRootTheme } from '@tamagui/next-theme';
import { Provider, initialWindowMetrics } from 'app/provider';
import { useServerInsertedHTML } from 'next/navigation';
import React from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { SolitoImageProvider } from 'solito/image';

import Tamagui from '../tamagui.config';

const imageURL = process.env.NEXT_PUBLIC_APP_URL as `https:${string}`;

export const ArcanaProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useRootTheme();

  useServerInsertedHTML(() => {
    // @ts-ignore
    const rnwStyle = StyleSheet.getSheet();
    return (
      <>
        <style dangerouslySetInnerHTML={{ __html: rnwStyle.textContent }} id={rnwStyle.id} />
        <style
          id="tamagui-css"
          dangerouslySetInnerHTML={{
            __html: Tamagui.getCSS(),
          }}
        />
      </>
    );
  });

  return (
    <NextThemeProvider
      onChangeTheme={(next) => {
        setTheme(next as any);
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
  );
};
