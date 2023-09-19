import { SessionContextProvider } from '@supabase/auth-helpers-react';

import { Props } from './index.web';

import { supabase } from 'app/utils/supabase/client';
import { AuthStatusChangeHandler } from 'app/utils/supabase/components/auth-status-change-handler';

export const AuthProvider = ({ children, initialSession }: Props) => {
  return (
    <SessionContextProvider supabaseClient={supabase} initialSession={initialSession}>
      <AuthStatusChangeHandler />
      {children}
    </SessionContextProvider>
  );
};
