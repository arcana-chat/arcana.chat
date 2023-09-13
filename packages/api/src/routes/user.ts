import { eq } from 'drizzle-orm';
import { UserTable, UserSchema, User } from '../db/schema';
import { router, protectedProcedure } from '../trpc';
import { Context } from '../context';
import { parse } from 'valibot';

export const getCurrentUser = async (ctx: Context) => {
  const { db, user } = ctx;

  if (!user) {
    return null;
  }

  const currentUser = await db.select().from(UserTable).where(eq(UserTable.id, user.id)).get();

  if (currentUser) {
    return currentUser;
  }

  return null;
};

export const createUser = async (ctx: Context, input: User) => {
  const { db } = ctx;

  try {
    const user = await db.insert(UserTable).values(input).run();

    return user;
  } catch (err) {
    console.log(err);
    return null;
  }
};

export const userRouter = router({
  current: protectedProcedure.query(async ({ ctx }) => await getCurrentUser(ctx)),
  create: protectedProcedure
    .input((raw) => parse(UserSchema, raw))
    .mutation(async ({ ctx, input }) => await createUser(ctx, input)),
});
