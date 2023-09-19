import { useState } from 'react';

import superjson from 'superjson';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { httpBatchLink } from '@trpc/client';
import { createTRPCReact } from '@trpc/react-query';

import type { AppRouter } from '@arcana/api/src/router';

import { supabase } from '../supabase/client';

/**
 * A set of typesafe hooks for consuming your API.
 */
export const trpc = createTRPCReact<AppRouter>();

const getBaseUrl = () => process.env.NEXT_PUBLIC_API_URL;

/**
 * A wrapper for your app that provides the TRPC context.
 */
export const TRPCProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() =>
    trpc.createClient({
      transformer: superjson,
      links: [
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
    })
  );

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </trpc.Provider>
  );
};
