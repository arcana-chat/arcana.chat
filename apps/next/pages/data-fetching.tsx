import Head from 'next/head'

import { DataFetchingScreen } from 'app/features/data-fetching/screen'

export default function Page() {
  return (
    <>
      <Head>
        <title>Data Fetching</title>
      </Head>
      <DataFetchingScreen />
    </>
  )
}
