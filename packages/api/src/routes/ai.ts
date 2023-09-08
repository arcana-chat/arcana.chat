import { z } from 'zod';
import Configuration, { OpenAI } from 'openai';
import { TRPCError } from '@trpc/server';

import { router, protectedProcedure, publicProcedure } from '../trpc';
import { ChatCompletionMessage } from 'openai/resources/chat';

const openai = new OpenAI({
  apiKey: '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', // process.env.OPENAI_API_KEY,
});

type Message = {
  role: ChatCompletionMessage['role'];
  content: string;
};

const prompt: Message = {
  role: 'system',
  content: `
You are a tarot reading bot that is in the middle of a conversation with a user. Here is the
conversation history with references to who's writing and what they are saying:
{runtime_conversation_history}. You'll notice that there are three entities, the system (me, the
prompt giver for the bot (you) and the user), the bot (you, the tarot interpreter), and the user
(who's providing the details for the reading and asking follow up questions). Never make references
to me (the system), do not address yourself as 'bot', and do not address the user as 'user'. You'll
notice that in the conversation history the following questions was asked: {additional_question}.
Please take all of this information and continue to respond to the user in a conversational to
  `,
};

const messages: Message[] = [prompt];

export const aiRouter = router({
  generateText: publicProcedure
    .input(z.object({ prompt: z.string() }))
    .mutation(async ({ input }) => {
      const { prompt } = input;

      messages.push({
        role: 'user',
        content: prompt,
      });

      try {
        const completion = await openai.chat.completions.create({
          model: 'gpt-3.5-turbo',
          messages,
        });

        const generatedText = completion.choices[0]?.message?.content;

        if (generatedText) {
          messages.push({
            role: completion.choices[0]?.message?.role,
            content: generatedText,
          });
        }

        return {
          generatedText: generatedText ?? '<no text generated>',
        };
      } catch (error: unknown) {
        // if (axios.isAxiosError(error)) {
        //   throw new TRPCError({
        //     code: 'INTERNAL_SERVER_ERROR',
        //     // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
        //     message: error.response?.data?.error?.message,
        //   });
        // }

        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: error instanceof Error ? error.message : 'Unknown error',
        });
      }
    }),

  reset: publicProcedure.mutation(() => {
    messages.length = 0;
  }),
});
