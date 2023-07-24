import { experimental_createTRPCNextAppDirServer } from '@trpc/next/app-dir/server';
import { httpBatchLink, loggerLink } from '@trpc/client';
import { inferRouterInputs, inferRouterOutputs } from '@trpc/server';
import type { AppRouter } from '@arcana/api/src/router';
import { supabase } from '../supabase';

const getBaseUrl = () => `${process.env.NEXT_PUBLIC_API_URL}`;

// This is a major WIP, right now we are just rendering things normally and
// not using SSR at all. We will need to figure out how to do this with
// Next.js's API routes when they are stable.

export const trpc = experimental_createTRPCNextAppDirServer<AppRouter>({
  config() {
    return {
      links: [
        loggerLink({
          enabled: (opts) =>
            process.env.NODE_ENV === 'development' ||
            (opts.direction === 'down' && opts.result instanceof Error),
        }),
        httpBatchLink({
          async headers() {
            const { data } = await supabase.auth.getSession();
            const token = data?.session?.access_token;

            return {
              Authorization: token ? `Bearer ${token}` : undefined,
            };
          },
          url: `${getBaseUrl()}/trpc`,
        }),
      ],
    };
  },
});

/**
 * Inference helpers for input types
 * @example type HelloInput = RouterInputs['example']['hello']
 **/
export type RouterInputs = inferRouterInputs<AppRouter>;

/**
 * Inference helpers for output types
 * @example type HelloOutput = RouterOutputs['example']['hello']
 **/
export type RouterOutputs = inferRouterOutputs<AppRouter>;
