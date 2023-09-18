import Head from 'next/head'

import { ParamsScreen } from 'app/features/params/screen'

export default function Page() {
  return (
    <>
      <Head>
        <title>Params Demo</title>
      </Head>
      <ParamsScreen />
    </>
  )
}
