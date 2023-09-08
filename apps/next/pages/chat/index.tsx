import Head from 'next/head';
import { ChatScreen } from 'app/features/chat/screen';

export default function Page() {
  return (
    <>
      <Head>
        <title>Chat</title>
      </Head>
      <ChatScreen />
    </>
  );
}
