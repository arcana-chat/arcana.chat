import Head from 'next/head'

import { SignUpScreen } from 'app/features/sign-up/screen'

export default function Page() {
  return (
    <>
      <Head>
        <title>Sign Up</title>
      </Head>
      <SignUpScreen />
    </>
  )
}
