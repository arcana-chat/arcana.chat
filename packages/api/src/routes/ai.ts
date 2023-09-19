import { TRPCError } from '@trpc/server';
import { ChatCompletionMessage } from 'openai/resources/chat';
import { object, parse, string } from 'valibot';
import { EventEmitter } from 'events';

import { router, protectedProcedure, publicProcedure } from '../trpc';
import { ChatSessionTable, MessageTable, UserTable } from '../db/schema';
import { v4 as uuid } from 'uuid';
import { createUser, getCurrentUser } from './user';

type Message = {
  role: 'user' | 'system';
  content: string;
};

let messages: Message[] = [
  {
    role: 'system',
    content: "Welcome to the Tarot Interpreter AI! Would you like a reading, or are you curious about specific cards?"
  }
];

const guideUser = async (userResponse: string, ctx: any) => {
  const context = "User wants to interact with a tarot reading AI. Understand if they want a reading or to learn about specific cards based on their response.";
  const openaiMessages = [
    { role: 'system', content: context },
    { role: 'user', content: userResponse }
  ];

  try {
    const completion = await ctx.openai.chat.completions.create({
      model: 'gpt-4',
      messages: openaiMessages,
    });

    const aiUnderstanding = completion.choices[0]?.message?.content;

    if (aiUnderstanding.includes("interested in learning")) {
      return "Which card are you curious about?";
    } else if (aiUnderstanding.includes("seeking a tarot reading")) {
      return "Great! Let's start with your past, present, future spread. Please tell me the card you've drawn for 'past'.";
    } else {
      return "I'm not entirely sure what you're looking for. Could you clarify if you'd like a reading or want to learn about a specific card?";
    }

  } catch (error) {
    console.error('Oh no! A wild error appeared: ', error);
    return "Oops! Something went wrong on my end. Let's try that again.";
  }
};

export const aiRouter = router({
  generateText: protectedProcedure
    .input((raw) => parse(object({ prompt: string() }), raw))
    .mutation(async ({ ctx, input }) => {
      const { prompt } = input;

      if (!prompt.trim()) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'The prompt cannot be empty.',
        });
      }

      const directResponse = await guideUser(prompt, ctx);
      if (directResponse) {
        return directResponse;
      }

      messages = [
        ...messages,
        {
          role: 'user',
          content: prompt,
        },
      ];

      try {
        const completion = await ctx.openai.chat.completions.create({
          model: 'gpt-4',
          messages,
        });

        const generatedText = completion.choices[0]?.message?.content;

        if (!generatedText) {
          throw new Error("Couldn't generate a response from the AI.");
        }

        messages = [
          ...messages,
          {
            role: 'system',
            content: generatedText,
          },
        ];

        console.log(JSON.stringify(messages, null, 2));

        return generatedText;
      } catch (error) {
        console.error('Oops! We hit a snag: ', error);
      }
    }),
});
