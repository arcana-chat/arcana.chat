import { TRPCProvider as Provider } from '../utils/trpc';

export function TRPCProvider({ children }: { children: React.ReactNode }) {
  // @ts-ignore -- stupid error, don't worry about this one.
  return <Provider>{children}</Provider>;
}
