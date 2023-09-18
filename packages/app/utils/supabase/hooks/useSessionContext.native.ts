import { useIsLoadingSession, useSession } from 'app/atoms';

export const useSessionContext = () => {
  const [session] = useSession();
  const [isLoading] = useIsLoadingSession();

  // TODO: Load profile information from external sources here
  // Ex: profile photo, display name, etc.

  return {
    session,
    user: session?.user,
    isLoading,
  };
};
