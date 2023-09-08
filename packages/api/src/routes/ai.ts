import { z } from 'zod';
import Configuration, { OpenAI } from 'openai';
import { TRPCError } from '@trpc/server';

import { router, protectedProcedure, publicProcedure } from '../trpc';
import { ChatCompletionMessage } from 'openai/resources/chat';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

type Message = {
  role: ChatCompletionMessage['role'];
  content: string;
};

const messages: Message[] = [];

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
