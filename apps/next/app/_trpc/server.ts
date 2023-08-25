import { createTRPCReact } from '@trpc/react-query';

import { type AppRouter } from '@arcana/api/src/router';

export const trpc = createTRPCReact<AppRouter>({});
