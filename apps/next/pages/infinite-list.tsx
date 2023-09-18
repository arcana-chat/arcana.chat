import Head from 'next/head'

import { InfiniteListScreen } from 'app/features/infinite-list/screen'

export default function Page() {
  return (
    <>
      <Head>
        <title>Infinite List</title>
      </Head>
      <InfiniteListScreen />
    </>
  )
}
