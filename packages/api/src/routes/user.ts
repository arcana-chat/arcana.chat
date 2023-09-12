import { eq } from 'drizzle-orm';
import { UserTable, UserSchema } from '../db/schema';
import { router, protectedProcedure } from '../trpc';
import { wrap } from '@decs/typeschema';

export const userRouter = router({
  current: protectedProcedure.query(async ({ ctx }) => {
    const { db } = ctx;
    const user = await db.select().from(UserTable).where(eq(UserTable.id, ctx.user.id)).get();
    if (user) {
      return user;
    }
    return null;
  }),
  create: protectedProcedure.input(wrap(UserSchema)).mutation(async ({ ctx, input }) => {
    const { db } = ctx;
    try {
      const user = await db.insert(UserTable).values(input).run();
      return user;
    } catch (err) {
      console.log(err);
      return null;
    }
  }),
});
