import {
  Anchor,
  Button,
  H1,
  H3,
  Paragraph,
  ScrollView,
  Separator,
  Sheet,
  XStack,
  YStack,
  useToastController,
} from '@arcana/ui'
import { ChevronDown } from '@tamagui/lucide-icons'
import React, { useEffect, useState } from 'react'
import { Linking } from 'react-native'
import { useLink } from 'solito/navigation'
import { isUserSignedIn, signOut } from 'app/utils/supabase'
import Constants from 'expo-constants'
import { useSheetOpen } from '@arcana/ui/src/atoms/sheet'
import { SolitoImage } from 'solito/image'

export function HomeScreen() {
  const [isSignedIn, setIsSignedIn] = useState(false)

  useEffect(() => {
    const fetchSignedInStatus = async () => {
      const signedInStatus = await isUserSignedIn()
      setIsSignedIn(signedInStatus)
    }

    fetchSignedInStatus()
  }, [])

  const signInLink = useLink({
    href: '/sign-in',
  })

  const signUpLink = useLink({
    href: '/sign-up',
  })

  const dataFetchingLink = useLink({
    href: '/data-fetching',
  })

  const infiniteListLink = useLink({
    href: '/infinite-list',
  })

  const paramsLink = useLink({
    href: '/params/tim',
  })

  return (
    <ScrollView>
      <YStack flex={1} justifyContent="center" alignItems="center" padding="$4" space="$4">
        <SolitoImage src="/arcana-logo.png" width={128} height={128} alt="T4 Logo" />
        <H1 textAlign="center">🔮 Arcana</H1>
        <Separator />
        <Paragraph textAlign="center" size="$2">
          AI Powered Tarrot
        </Paragraph>
        <Paragraph textAlign="center" size="$2">
          Tamagui is made by{' '}
          <Anchor href="https://twitter.com/natebirdman" target="_blank">
            Nate Weinert
          </Anchor>
          , give it a star{' '}
          <Anchor href="https://github.com/tamagui/tamagui" target="_blank" rel="noreferrer">
            on Github.
          </Anchor>
        </Paragraph>

        <H3>🦮🐴 App Demos</H3>
        <YStack space="$2">
          <Button {...infiniteListLink} space="$2">
            Infinite List
          </Button>
          <Button {...dataFetchingLink} space="$2">
            Fetching Data
          </Button>
          <Button {...paramsLink} space="$2">
            Params
          </Button>
          <SheetDemo />
        </YStack>
        {isSignedIn ? (
          <Button
            onPress={async () => {
              await signOut()
              setIsSignedIn(false)
            }}
            space="$2"
          >
            Sign Out
          </Button>
        ) : (
          <XStack space="$2">
            <Button {...signInLink} space="$2">
              Sign In
            </Button>
            <Button {...signUpLink} space="$2">
              Sign Up
            </Button>
          </XStack>
        )}
      </YStack>
    </ScrollView>
  )
}

const SheetDemo = (): React.ReactNode => {
  const [open, setOpen] = useSheetOpen()
  const [position, setPosition] = useState(0)
  const toast = useToastController()

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
              setOpen(false)
              const isExpoGo = Constants.appOwnership === 'expo'
              if (!isExpoGo) {
                toast.show('Sheet closed!', {
                  message: 'Just showing how toast works...',
                })
              }
            }}
          />
        </Sheet.Frame>
      </Sheet>
    </>
  )
}
