import { type ReactNode, useCallback, useState } from 'react';

import Constants from 'expo-constants';
import { SolitoImage } from 'solito/image';
import { useLink } from 'solito/navigation';

import { ChevronDown } from '@tamagui/lucide-icons';

import {
  Anchor,
  BlurView,
  Button,
  H1,
  H2,
  H3,
  Image,
  Paragraph,
  ScrollView,
  Separator,
  Sheet,
  Stack,
  XStack,
  YStack,
  useToastController,
} from '@arcana/ui';

import { useSheetOpen } from 'app/atoms';
import { useCurrentUser } from 'app/utils/supabase/hooks/useCurrentUser';
import { useSupabase } from 'app/utils/supabase/hooks/useSupabase';
import { trpc } from 'app/utils/trpc';

export function HomeScreen() {
  // const supabase = useSupabase();
  // const utils = trpc.useContext();

  // const { isAuthed, user } = useCurrentUser();

  const signInLink = useLink({
    href: '/sign-in',
  });

  const signUpLink = useLink({
    href: '/sign-up',
  });

  const dataFetchingLink = useLink({
    href: '/data-fetching',
  });

  const infiniteListLink = useLink({
    href: '/infinite-list',
  });

  const paramsLink = useLink({
    href: '/params/tim',
  });

  // const signOut = useCallback(async () => {
  //   supabase.auth.signOut();
  //   // Clear tanstack query cache of authenticated routes
  //   utils.auth.secretMessage.reset();
  // }, []);

  return (
    <ScrollView
      contentContainerStyle={{
        flex: 1,
      }}
    >
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

        {/* {isAuthed && (
          <XStack space="$4">
            <Paragraph>{user?.email}</Paragraph>
            <Paragraph>{user?.id}</Paragraph>
          </XStack>
        )}

        {!isAuthed ? (
          <XStack space="$4">
            <Button {...signInLink} space="$2">
              Sign In
            </Button>

            <Button {...signUpLink} space="$2">
              Sign Up
            </Button>
          </XStack>
        ) : (
          <Button onPress={() => signOut()} space="$2">
            Sign Out
          </Button>
        )} */}
      </YStack>
    </ScrollView>
  );
}

const SheetDemo = (): ReactNode => {
  const [open, setOpen] = useSheetOpen();
  const [position, setPosition] = useState(0);
  const toast = useToastController();

  return (
    <>
      <Button onPress={() => setOpen((x) => !x)} space="$2">
        Bottom Sheet
      </Button>
      <Sheet
        modal
        open={open}
        onOpenChange={setOpen}
        snapPoints={[80]}
        position={position}
        onPositionChange={setPosition}
        dismissOnSnapToBottom
      >
        <Sheet.Overlay />
        <Sheet.Frame alignItems="center" justifyContent="center">
          <Sheet.Handle />
          <Button
            size="$6"
            circular
            icon={ChevronDown}
            onPress={() => {
              setOpen(false);
              const isExpoGo = Constants.appOwnership === 'expo';
              if (!isExpoGo) {
                toast.show('Sheet closed!', {
                  message: 'Just showing how toast works...',
                });
              }
            }}
          />
        </Sheet.Frame>
      </Sheet>
    </>
  );
};
