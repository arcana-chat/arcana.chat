import { createPagesBrowserClient, type Session } from '@supabase/auth-helpers-nextjs';
import { ReactNode, useState } from 'react';
import { SessionContextProvider } from '@supabase/auth-helpers-react';
import { secureCookieOptions } from 'app/utils/supabase/cookies';
import { AuthStatusChangeHandler } from 'app/utils/supabase/components/auth-status-change-handler';

export interface Props {
  children: ReactNode;
  initialSession: Session | null;
}

export const AuthProvider = ({ children, initialSession }: Props): ReactNode => {
  const [supabaseClient] = useState(() =>
    createPagesBrowserClient({
      cookieOptions: secureCookieOptions,
    })
  );

  return (
    <SessionContextProvider supabaseClient={supabaseClient} initialSession={initialSession}>
      <AuthStatusChangeHandler />
      {children}
    </SessionContextProvider>
  );
};
