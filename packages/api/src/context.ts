import { type inferAsyncReturnType } from '@trpc/server';
import { type FetchCreateContextFnOptions } from '@trpc/server/adapters/fetch';
import { DrizzleD1Database } from 'drizzle-orm/d1';
import Configuration, { OpenAI } from 'openai';
import { createDb } from './db/client';
import jwt from '@tsndr/cloudflare-worker-jwt';

interface User {
  id: string;
}

interface ApiContextProps {
  user: User | null;
  openai: Configuration;
  db: DrizzleD1Database;
}

interface CtxProps {
  d1: D1Database;
  verificationKey: string;
  openaiKey: string;
}

export const createContext = async (
  { d1, verificationKey, openaiKey }: CtxProps,
  opts: FetchCreateContextFnOptions
): Promise<ApiContextProps> => {
  const db = createDb(d1);

  const openai = new OpenAI({
    apiKey: openaiKey,
  });

  async function getUser() {
    const sessionToken = opts.req.headers.get('authorization')?.split(' ')[1];

    if (sessionToken) {
      if (!verificationKey) {
        console.error('JWT_VERIFICATION_KEY is not set');
        return null;
      }

      try {
        const authorized = await jwt.verify(sessionToken, verificationKey, {
          algorithm: 'HS256',
        });
        if (!authorized) {
          return null;
        }

        const decodedToken = jwt.decode(sessionToken);

        // Check if token is expired
        const expirationTimestamp = decodedToken.payload.exp;
        const currentTimestamp = Math.floor(Date.now() / 1000);
        if (!expirationTimestamp || expirationTimestamp < currentTimestamp) {
          return null;
        }

        const userId = decodedToken?.payload?.sub;

        if (userId) {
          return {
            id: userId,
          };
        }
      } catch (e) {
        console.error(e);
      }
    }

    return null;
  }

  const user = await getUser();

  return { user, db, openai };
};

export type Context = inferAsyncReturnType<typeof createContext>;
