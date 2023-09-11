import { createWSClient } from '@trpc/client';

export const wsClient = createWSClient({
  url: 'ws://localhost:3001', // adjust if your WS server is on a different endpoint
});
