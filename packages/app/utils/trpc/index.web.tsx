import superjson from 'superjson';

import { httpBatchLink, loggerLink } from '@trpc/client';
import { createTRPCNext } from '@trpc/next';

import type { AppRouter } from '@arcana/api/src/router';

import { getToken } from '../supabase/cookies';

const getBaseUrl = () => `${process.env.NEXT_PUBLIC_API_URL}`;

export const trpc = createTRPCNext<AppRouter>({
  config() {
    return {
      transformer: superjson,
      links: [
        loggerLink({
          enabled: (opts) =>
            process.env.NODE_ENV === 'development' ||
            (opts.direction === 'down' && opts.result instanceof Error),
        }),
        httpBatchLink({
          async headers() {
            return {
              Authorization: `Bearer ${getToken()}`,
            };
          },
          url: `${getBaseUrl()}/trpc`,
        }),
      ],
    };
  },
  ssr: false,
});
