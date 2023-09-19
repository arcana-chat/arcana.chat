import { SolitoImage } from 'solito/image';
import { useLink } from 'solito/link';

import { BlurView, Button, H1, Paragraph, ScrollView, Stack, XStack, YStack } from '@arcana/ui';

import { useCurrentUser } from 'app/utils/supabase/hooks/useCurrentUser';
import { useSupabase } from 'app/utils/supabase/hooks/useSupabase';
import { trpc } from 'app/utils/trpc';

export function HomeScreen() {
  const utils = trpc.useContext();
  const supabase = useSupabase();
  const { user } = useCurrentUser();

  const signInLink = useLink({
    href: '/sign-in',
  });

  const signUpLink = useLink({
    href: '/sign-up',
  });

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <Stack position="fixed" width="100%" height="100%">
        <SolitoImage fill src="/images/tarot-cards.jpg" contentFit="cover" alt="Background" />
        <BlurView tint="dark" saturation={200} />
      </Stack>
      <YStack flex={1} justifyContent="center" alignItems="center" space="$4">
        <XStack justifyContent="center" alignItems="center" padding="$4" space="$4">
          <H1 fontSize={128} paddingVertical="$8" marginTop="$4">
            🔮
          </H1>
          <Stack alignItems="flex-start">
            <H1 fontSize={128} textAlign="center" fontWeight="700" letterSpacing={4}>
              Arcana
            </H1>
          </Stack>
        </XStack>

        {user && (
          <XStack space="$4">
            <Paragraph>{user?.email}</Paragraph>
            <Paragraph>{user?.id}</Paragraph>
          </XStack>
        )}

        {!user ? (
          <XStack space="$4">
            <Button {...signInLink} space="$2">
              Sign In
            </Button>

            <Button {...signUpLink} space="$2">
              Sign Up
            </Button>
          </XStack>
        ) : (
          <Button
            onPress={async () => {
              supabase.auth.signOut();
              // Clear tanstack query cache of authenticated routes
              utils.auth.secretMessage.reset();
            }}
            space="$2"
          >
            Sign Out
          </Button>
        )}
      </YStack>
    </ScrollView>
  );
}
