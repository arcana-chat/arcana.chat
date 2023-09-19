import { useState, useCallback, useEffect } from 'react';
import { GiftedChat } from 'react-native-gifted-chat';

import { H1, Stack, Paragraph, View, useWindowDimensions, Input } from '@arcana/ui';
import { useMutation, useQuery } from '@tanstack/react-query';
import { trpc } from 'app/utils/trpc';
import { supabase } from 'app/utils/supabase';

type Message = {
  type: 'user' | 'bot' | 'system';
  message: string;
};

const useChatQuery = () => {
  return useMutation({
    mutationFn: ({ message }: Message) =>
      fetch('http://127.0.0.1:5000/process_messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),
      }).then(async (res) => {
        const data = await res.json<{ response: string }>();

        return {
          message: data.response,
          type: 'bot',
        };
      }),
  });
};

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
      setMessages([
        ...messages,
        {
          content: data,
          author: 'AI',
        },
      ]);
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
