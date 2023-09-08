import { router } from './trpc';
import { helloRouter } from './routes/hello';
import { authRouter } from './routes/auth';
import { userRouter } from './routes/user';
import { aiRouter } from './routes/ai';

export const appRouter = router({
  hello: helloRouter,
  user: userRouter,
  auth: authRouter,
  ai: aiRouter,
});

export type AppRouter = typeof appRouter;
