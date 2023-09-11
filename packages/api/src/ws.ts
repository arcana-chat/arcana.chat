import { applyWSSHandler } from '@trpc/server/adapters/ws';
import ws from 'ws';
import { createContext } from './context';
import { appRouter } from './router';

const wss = new ws.Server({
  port: 3001,
});

const handler = applyWSSHandler({
  wss,
  router: appRouter,
  createContext: (opts) => {
    console.log({ opts });

    console.log({ env: process.env });

    return createContext(
      {
        d1: process.env.DB as unknown as D1Database,
        verificationKey: process.env.JWT_VERIFICATION_KEY as string,
        openaiKey: process.env.OPENAI_API_KEY as string,
        supabaseKey: process.env.SUPABASE_ANON_KEY as string,
        supabaseUrl: process.env.SUPABASE_URL as string,
      },
      opts
    );
  },
});

wss.on('connection', (ws) => {
  console.log(`➕➕ Connection (${wss.clients.size})`);
  ws.once('close', () => {
    console.log(`➖➖ Connection (${wss.clients.size})`);
  });
});

console.log('✅ WebSocket Server listening on ws://localhost:3001');

process.on('SIGTERM', () => {
  console.log('SIGTERM');
  handler.broadcastReconnectNotification();
  wss.close();
});
