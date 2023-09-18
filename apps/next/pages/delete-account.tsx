import Head from 'next/head'

import { DeleteAccountScreen } from 'app/features/delete-account/screen'

export default function Page() {
  return (
    <>
      <Head>
        <title>Delete Account</title>
      </Head>
      <DeleteAccountScreen />
    </>
  )
}
