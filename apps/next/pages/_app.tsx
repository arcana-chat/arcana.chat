import 'raf/polyfill';
import '@arcana/ui/fonts.css';
import '@tamagui/core/reset.css';
import '@tamagui/font-inter/css/400.css';
import '@tamagui/font-inter/css/700.css';

import Head from 'next/head';

import type { SolitoAppProps } from 'solito';

import type { Session } from '@supabase/supabase-js';

import { Provider } from 'app/provider';
import { trpc } from 'app/utils/trpc/index.web';

if (typeof requestAnimationFrame === 'undefined') {
  globalThis['requestAnimationFrame'] = setImmediate;
}

if (process.env.NODE_ENV === 'production') {
  require('../public/tamagui.css');
}

const title = `${process.env.NEXT_PUBLIC_METADATA_NAME}`;
const description = `${process.env.NEXT_PUBLIC_METADATA_DESCRIPTION}`;
const url = `${process.env.NEXT_PUBLIC_METADATA_URL}`;

const T4App = ({ Component, pageProps }: SolitoAppProps<{ initialSession: Session | null }>) => {
  return (
    <>
      <Metadata />
      <Provider initialSession={pageProps.initialSession}>
        <Component {...pageProps} />
      </Provider>
    </>
  );
};

export default trpc.withTRPC(T4App);

const Metadata = () => (
  <Head>
    <title>{title ?? 'Arcana'}</title>
    <meta name="description" content={description} />
    <meta property="og:url" content={url} />

    <link rel="icon" href="/favicon.ico" />
    <style>
      {`
          body, #root, #__next {
            min-width: 100% !important;
          }
      `}
    </style>
  </Head>
);
