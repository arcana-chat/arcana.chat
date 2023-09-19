import { useState } from 'react';

import { type Session, createPagesBrowserClient } from '@supabase/auth-helpers-nextjs';
import { SessionContextProvider } from '@supabase/auth-helpers-react';

import { AuthStatusChangeHandler } from 'app/utils/supabase/components/auth-status-change-handler';
import { secureCookieOptions } from 'app/utils/supabase/cookies';

export interface Props {
  children: React.ReactNode;
  initialSession: Session | null;
}

export const AuthProvider = ({ children, initialSession }: Props): React.ReactNode => {
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
