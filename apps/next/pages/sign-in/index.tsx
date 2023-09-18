import Head from 'next/head';

import { SignInScreen } from 'app/features/sign-in/screen';

export default function Page() {
  return (
    <>
      <Head>
        <title>Sign Up</title>
      </Head>
      <SignInScreen />
    </>
  );
}
