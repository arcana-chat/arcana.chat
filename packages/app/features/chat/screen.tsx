import { useEffect, useState } from 'react';

import { H1, Input, Paragraph, Stack, View } from '@arcana/ui';

import { supabase } from 'app/utils/supabase/client';
import { trpc } from 'app/utils/trpc';

export const ChatScreen = () => {
  const [prompt, setPrompt] = useState('');
  const [messages, setMessages] = useState<any[]>([]);

  useEffect(() => {
    const subscription = supabase
      .channel('tarot-session')
      .on('broadcast', { event: 'test' }, (payload) => console.log(payload))
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, []);

  const ai = trpc.ai.generateText.useMutation({
    onSuccess: (data) => {
      console.log({ data });
      // setMessages([
      //   ...messages,
      //   {
      //     content: data.generatedText,
      //     author: 'AI',
      //   },
      // ]);
    },

    onError: (error) => {
      setMessages([
        ...messages,
        {
          content: error.message ?? 'An error occurred',
          author: 'AI',
          isError: true,
        },
      ]);
    },

    // onSettled: () => {
    //   setWaiting(false);
    //   scrollToBottom();
    // },
  });

  const handleUpdate = (prompt: string) => {
    // setWaiting(true);

    setMessages([
      ...messages,
      {
        content: prompt.replace(/\n/g, '\n\n'),
        author: 'User',
      },
    ]);

    // scrollToBottom();

    ai.mutate({ prompt });
  };

  const handleReset = () => {
    setMessages([]);
    // resetMutation.mutate();
  };

  return (
    <Stack alignItems="center" justifyContent="center" flexGrow={1}>
      <H1>Chat</H1>
      <Stack flex={1}>
        {messages.map((message, index) => (
          <View key={`${index}`}>
            <Paragraph>{message.content}</Paragraph>
          </View>
        ))}

        <Input
          placeholder="Type a message..."
          onChange={(e) => setPrompt(e.nativeEvent.text)}
          onKeyPress={(e) => {
            if (e.nativeEvent.key === 'Enter') {
              handleUpdate(prompt);
            }
          }}
        />
      </Stack>
    </Stack>
  );
};
