import { useState, useCallback, useEffect } from 'react';
import { GiftedChat } from 'react-native-gifted-chat';

import { H1, Stack, Paragraph, View, useWindowDimensions, Input } from '@arcana/ui';
import { useMutation, useQuery } from '@tanstack/react-query';

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
  const chatState = useChatQuery();

  const [messages, setMessages] = useState<any[]>([]);

  const onSend = useCallback(async (message: string) => {
    chatState.mutate({ message, type: 'user' });
  }, []);

  useEffect(() => {
    if (chatState.data?.message) {
      setMessages((prev) => [...prev, chatState.data]);
    }
  }, [chatState.data]);

  return (
    <Stack alignItems="center" justifyContent="center" flexGrow={1}>
      <H1>Chat</H1>
      <Stack flex={1}>
        {messages.map((message, index) => (
          <View key={`${index}`}>
            <Paragraph>{message.message}</Paragraph>
          </View>
        ))}

        <Input
          placeholder="Type a message..."
          onSubmitEditing={(e) => onSend(e.nativeEvent.text)}
        />
      </Stack>
    </Stack>
  );
};
