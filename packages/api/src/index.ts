import { Hono } from 'hono';
import { cors } from 'hono/cors';

import { trpcServer } from '@hono/trpc-server';

import { createContext } from './context';
import { appRouter } from './router';

type Bindings = {
  DB: D1Database;
  JWT_VERIFICATION_KEY: string;
  APP_URL: string;
  OPENAI_API_KEY: string;
};

const app = new Hono<{ Bindings: Bindings }>();

// Setup CORS for the frontend
app.use('/trpc/*', async (c, next) => {
  if (c.env.APP_URL === undefined) {
    console.log('APP_URL is not set. CORS errors may occur.');
  }

  return await cors({
    origin: [c.env.APP_URL],
    allowMethods: ['POST', 'GET'],
  })(c, next);
});

// Setup TRPC server with context
app.use(
  '/trpc/*',
  async (c, next) =>
    await trpcServer({
      router: appRouter,
      createContext: async (opts) =>
        await createContext(
          {
            d1: c.env.DB,
            verificationKey: c.env.JWT_VERIFICATION_KEY,
            openaiKey: c.env.OPENAI_API_KEY,
          },
          opts
        ),
    })(c, next)
);

export default app;
