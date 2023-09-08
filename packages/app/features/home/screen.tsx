import {
  Anchor,
  Button,
  H1,
  H3,
  Image,
  Paragraph,
  ScrollView,
  Separator,
  Sheet,
  Stack,
  XStack,
  YStack,
  BlurView,
  useToastController,
  Text,
  H2,
} from '@arcana/ui';
import { ChevronDown } from '@tamagui/lucide-icons';
import React, { useEffect, useState } from 'react';
import { useLink } from 'solito/navigation';
import { isUserSignedIn, signOut } from 'app/utils/supabase';
import Constants from 'expo-constants';
import { useSheetOpen } from '@arcana/ui/src/atoms/sheet';
import { SolitoImage } from 'solito/image';

export function HomeScreen() {
  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
    const fetchSignedInStatus = async () => {
      const signedInStatus = await isUserSignedIn();
      setIsSignedIn(signedInStatus);
    };

    fetchSignedInStatus();
  }, []);

  console.log({ isSignedIn });

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
      <XStack flex={1} justifyContent="center" alignItems="center" padding="$4" space="$4">
        <H1 fontSize={128} paddingVertical="$8" marginTop="$4">
          🔮
        </H1>
        <Stack alignItems="flex-start">
          <H1 fontSize={128} textAlign="center" fontWeight="700" letterSpacing={4}>
            Arcana
          </H1>
        </Stack>
      </XStack>

      <Button {...signInLink} space="$2">
        Sign In
      </Button>

      <Button {...signUpLink} space="$2">
        Sign In
      </Button>
    </ScrollView>
  );
}

const SheetDemo = (): React.ReactNode => {
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
