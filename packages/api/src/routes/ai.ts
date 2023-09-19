import { TRPCError } from '@trpc/server';
import { ChatCompletionMessage } from 'openai/resources/chat';
import { object, parse, string } from 'valibot';
import { EventEmitter } from 'events';

import { router, protectedProcedure, publicProcedure } from '../trpc';
import { ChatSessionTable, MessageTable, UserTable } from '../db/schema';
import { v4 as uuid } from 'uuid';
import { createUser, getCurrentUser } from './user';

type UserState = 'initial' | 'learning' | 'reading';
let userState: UserState = 'initial';

type Message = {
  role: 'user' | 'system';
  content: string;
};

let messages: Message[] = [
  {
    role: 'system',
    content:
      'Welcome to the Tarot Interpreter AI! Would you like a reading, or are you curious about specific cards?',
  },
];

const guideUser = async (userResponse: string, ctx: any) => {
  const context =
    "User wants to interact with a tarot reading AI. Please categorize their intention as either 'reading' or 'learning' based on their response.";
  const openaiMessages = [
    { role: 'system', content: context },
    { role: 'user', content: userResponse },
  ];

  try {
    const completion = await ctx.openai.chat.completions.create({
      model: 'gpt-4',
      messages: openaiMessages,
    });

    const aiUnderstanding = completion.choices[0]?.message?.content;

    if (userState === 'initial') {
      console.log(">>>>>>>>>Inside 'initial' state logic.<<<<<<<<<");
      if (aiUnderstanding.trim().toLowerCase() === 'learning') {
        userState = 'learning'; // Update the state
        return 'Which card are you curious about?';
      } else if (aiUnderstanding.trim().toLowerCase() === 'reading') {
        userState = 'reading'; // Update the state
        return "Great! Let's start with your past, present, future spread. Please tell me the card you've drawn for 'past'.";
      } else {
        return "I'm not entirely sure what you're looking for. Could you clarify if you'd like a reading or want to learn about a specific card?";
      }
    }

    // If the user's state is "learning"
    else if (userState === 'learning') {
      console.log(">>>>>>>>>Updated userState to:", userState, "<<<<<<<<<");
      const context = `You are an ai powered tarot bot. The user has indicated that they want to learn about tarot cards. They have indicated that they want to learn about ${userResponse}. Can you provide a brief description about this card? The description should include the general meaning, the upright meaning, the reverse meaning, and any other associations.`;
      const openaiMessages = [
        { role: 'system', content: context },
        { role: 'user', content: userResponse },
      ];

      try {
        const completion = await ctx.openai.chat.completions.create({
          model: 'gpt-4',
          messages: openaiMessages,
        });

        const aiCardDescription = completion.choices[0]?.message?.content;

        if (!aiCardDescription) {
          throw new Error("Couldn't generate a response from the AI.");
        }

        return aiCardDescription;
      } catch (error) {
        console.error("Oops! The tarot cards didn't foresee this error: ", error);
        return 'Hmm, something went wrong while reading the energies of that card. Can we try another?';
      }
    }

    // If the user's state is "reading"
    else if (userState === 'reading') {
      console.log("Starting function. Current userState:", userState);
      // Handle the reading logic here.
      return `Let's discuss the significance of the ${userResponse} card in the 'past' position. ...`; // Interpret card for past.
    } else {
      console.error('Unexpected user state encountered.');
      return "Oops! Something's not right on my end. Let's try to refocus.";
    }
  } catch (error) {
    console.error("Seems like Mercury's in retrograde again, cause there was an error: ", error);
    return "Oops! Something went awry on my end. Let's try that again.";
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
