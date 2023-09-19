import { useCallback, useEffect, useMemo, useState } from 'react';

import { AuthError, User } from '@supabase/supabase-js';

import { H1, Stack } from '@arcana/ui';

import { useCurrentUser } from 'app/utils/supabase/hooks/useCurrentUser';
import { trpc } from 'app/utils/trpc';

// const details = getUser()

// const useGetSession = () => {
//   const [user, setUser] = useState<User | null>();

//   const fetchUser = useCallback(async () => {
//     const details = await getUser();

//     setUser(details.user);
//   }, [setUser]);

//   useEffect(() => {
//     fetchUser();
//   }, []); // component did mount!

//   return useMemo(() => user, [user]);
// };

export const WelcomeScreen = () => {
  const { user } = useCurrentUser();

  console.log({ user });
  // const { data: user } = trpc.auth.getUser.useQuery();

  // useEffect(() => {
  //   getUser();
  // }, []);

  // console.log(user);

  return (
    <Stack>
      <H1>Welcome {user?.email}</H1>
    </Stack>
  );
};
