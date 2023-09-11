import { Hono } from 'hono';
import { appRouter } from './router';
import { cors } from 'hono/cors';
import { createContext } from './context';
import { trpcServer } from '@hono/trpc-server';

type Bindings = {
  DB: D1Database;
  JWT_VERIFICATION_KEY: string;
  APP_URL: string;
  OPENAI_API_KEY: string;
  SUPABASE_ANON_KEY: string;
  SUPABASE_URL: string;
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
      createContext: async (opts) => {
        return await createContext(
          {
            d1: c.env.DB,
            verificationKey: c.env.JWT_VERIFICATION_KEY,
            openaiKey: c.env.OPENAI_API_KEY,
            supabaseKey: c.env.SUPABASE_ANON_KEY,
            supabaseUrl: c.env.SUPABASE_URL,
          },
          opts
        );
      },
    })(c, next)
);

export default app;
