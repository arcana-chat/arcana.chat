import { useState, useMemo, useCallback, useEffect } from 'react';
import { Stack, H1 } from '@arcana/ui';
import { isUserSignedIn, getUser } from 'app/utils/supabase';
import { User, AuthError } from '@supabase/supabase-js';

// const details = getUser()

const useGetSession = () => {
  const [user, setUser] = useState<User | null>();

  const fetchUser = useCallback(async () => {
    const details = await getUser();

    setUser(details.user);
  }, [setUser]);

  useEffect(() => {
    fetchUser();
  }, []); // component did mount!

  return useMemo(() => user, [user]);
};

export const WelcomeScreen = () => {
  const user = useGetSession();

  console.log(user);

  return (
    <Stack>
      <H1>Welcome {user?.email}</H1>
    </Stack>
  );
};
