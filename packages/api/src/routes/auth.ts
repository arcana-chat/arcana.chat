import { parse, string } from 'valibot';

import { protectedProcedure, publicProcedure, router } from '../trpc';

export const authRouter = router({
  getSession: publicProcedure.query(({ ctx }) => {
    return ctx.user;
  }),
  secretMessage: protectedProcedure
    .input((raw) => parse(string(), raw))
    .query(({ input }) => {
      return `Hello ${input ?? '<Secret>'}!`;
    }),
});
