import { createContext } from '@arcana/api/src/context';
import { appRouter } from '@arcana/api/src/router';
import { fetchRequestHandler } from '@trpc/server/adapters/fetch';

const handler = (req: Request) =>
  fetchRequestHandler({
    endpoint: '/api/trpc',
    req,
    router: appRouter,
    createContext: async (opts) => {
      console.log(opts);

      return {};
      // return await createContext(c.env.DB, c.env.JWT_VERIFICATION_KEY, opts);
    },
  });

export { handler as GET, handler as POST };
