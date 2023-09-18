import { initTRPC, TRPCError } from '@trpc/server';
import { type Context } from './context';
import superjson from 'superjson';

const t = initTRPC.context<Context>().create({
  transformer: superjson,
  errorFormatter({ shape }) {
    return shape;
  },
});

/**
 * This is a middleware that checks if the user is authenticated
 * @link https://trpc.io/docs/middlewares
 */
const isAuthed = t.middleware(({ next, ctx }) => {
  if (ctx.user === null) {
    throw new TRPCError({ code: 'UNAUTHORIZED', message: 'Not authenticated' });
  }

  return next({
    ctx: {
      user: ctx.user,
    },
  });
});

export const router = t.router;

/**
 * Can be used anywhere in any context, does not require a JWT
 */
export const publicProcedure = t.procedure;

/**
 * Can only be used if the user is authenticated, requires a JWT
 */
export const protectedProcedure = t.procedure.use(isAuthed);
