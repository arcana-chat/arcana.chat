import { useEffect } from 'react';

import { useRouter as useNextRouter } from 'next/router';

import { useRouter } from 'solito/router';

import { AuthChangeEvent } from '@supabase/supabase-js';

import { useSupabase } from 'app/utils/supabase/hooks/useSupabase';


export const useAuthRedirect = () => {
  const supabase = useSupabase();
  const router = useRouter();
  const { pathname } = useNextRouter();

  useEffect(() => {
    const signOutListener = supabase.auth.onAuthStateChange(async (event: AuthChangeEvent) => {
      if (event === 'SIGNED_OUT' && pathname !== '/') {
        router.replace('/');
      }
    });

    return () => {
      signOutListener.data.subscription.unsubscribe();
    };
  }, [supabase, router, pathname]);
};
