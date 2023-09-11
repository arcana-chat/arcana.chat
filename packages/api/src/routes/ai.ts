import { TRPCError } from '@trpc/server';
import { ChatCompletionMessage } from 'openai/resources/chat';
import { object, parse, string } from 'valibot';
import { EventEmitter } from 'events';

import { router, protectedProcedure, publicProcedure } from '../trpc';

type Message = {
  role: ChatCompletionMessage['role'];
  content: string;
};

const initialPrompt: Message = {
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

const messages: Message[] = [initialPrompt];

export const aiRouter = router({
  generateText: publicProcedure
    .input((raw) => parse(object({ prompt: string() }), raw))
    .subscription(async ({ ctx, input }) => {
      const { prompt } = input;

      messages.push({
        role: 'user',
        content: prompt,
      });

      // const user = await ctx.db. //.insert(User).values(input).run();

      const subscription = ctx.supabase
        .channel('tarot-session')
        .on('broadcast', { event: 'test' }, (payload) => console.log(payload))
        .subscribe();

      // .from('messages')
      // .on('INSERT', (payload) => {
      //   // Emitting the new message to subscribers
      //   emit.next(payload.new);
      // })();

      // Unsubscribe function to clean up when the client disconnects or stops subscribing
      try {
        const completion = await ctx.openai.chat.completions.create({
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

        return () => {
          ctx.supabase.removeChannel(subscription);
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
