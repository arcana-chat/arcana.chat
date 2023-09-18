import { supabase } from 'app/utils/supabase/client';
import { type Props } from './index.web';
import { AuthStatusChangeHandler } from 'app/utils/supabase/components/auth-status-change-handler';
import { SessionContextProvider } from '@supabase/auth-helpers-react';

export const AuthProvider = ({ children, initialSession }: Props) => {
  return (
    <SessionContextProvider supabaseClient={supabase} initialSession={initialSession}>
      <AuthStatusChangeHandler />
      {children}
    </SessionContextProvider>
  );
};
