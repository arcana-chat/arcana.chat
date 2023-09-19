import { ChatCompletionMessage } from 'openai/resources/chat';
import { v4 as uuid } from 'uuid';
import { object, parse, string } from 'valibot';

import { TRPCError } from '@trpc/server';

import { ChatSessionTable, MessageTable, UserTable } from '../db/schema';
import { protectedProcedure, publicProcedure, router } from '../trpc';
import { createUser, getCurrentUser } from './user';

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

      try {
        let currentUser = await getCurrentUser(ctx);
        console.log('prev', currentUser?.id, ctx.user.id);
        // This is bad don't do this -- just doing this for a test
        if (!currentUser) {
          await createUser(ctx, { ...ctx.user, email: 'test@test.com' });
        }

        currentUser = await getCurrentUser(ctx);

        console.log(currentUser?.id);

        // First, create a new chat session or fetch an existing one (depends on your use-case)
        // For this example, I'm assuming you're creating a new chat session every time.
        const chatSession = await ctx.db
          .insert(ChatSessionTable)
          .values({
            id: uuid(),
            userId: ctx.user.id,
          })
          .returning();

        console.log(JSON.stringify(chatSession, null, 2));
      } catch (error) {
        console.log(error);
      }
      // Insert the user's message into the `Message` table
      // await ctx.db.insert(MessageTable).values({
      //   id: uuid(),
      //   sessionId: chatSession[0].id,
      //   role: 'user',
      //   content: prompt,
      // });
      // try {
      //   const completion = await ctx.openai.chat.completions.create({
      //     model: 'gpt-3.5-turbo',
      //     messages: [insertedMessage], // Using the insertedMessage here
      //   });

      //   const generatedText = completion.choices[0]?.message?.content;
      //   if (generatedText) {
      //     // Insert the AI's response into the `Message` table
      //     await ctx.db.insert('Message', {
      //       sessionId: chatSession.id,
      //       role: 'bot', // The role should be 'bot' for AI response
      //       content: generatedText,
      //     });
      //   }

      //   return generatedText;
      // } catch (error: unknown) {
      //   throw new TRPCError({
      //     code: 'INTERNAL_SERVER_ERROR',
      //     message: error instanceof Error ? error.message : 'Unknown error',
      //   });
      // }
    }),

  reset: publicProcedure.mutation(async ({ ctx }) => {
    // Depending on how you want to reset,
    // For instance, if you want to clear all messages from the database
    await ctx.db.delete('Message');
    await ctx.db.delete('ChatSession');
  }),
});
