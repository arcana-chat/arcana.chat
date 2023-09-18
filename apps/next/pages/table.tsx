import Head from 'next/head'

import { TableScreen } from 'app/features/table/screen'

export default function Page() {
  return (
    <>
      <Head>
        <title>TanStack Table</title>
      </Head>
      <TableScreen />
    </>
  )
}
