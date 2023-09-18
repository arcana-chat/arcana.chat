import { useRouter } from 'solito/navigation';

import { Provider, SignInWithOAuthCredentials } from '@supabase/supabase-js';

import { YStack } from '@arcana/ui';
import { SignUpSignInComponent } from '@arcana/ui/src/SignUpSignIn';

import { signIn } from 'app/utils/supabase';
import { signInWithOAuth } from 'app/utils/supabase/auth';

const OAUTH_CREDENTIALS = {
  // Verified providers
  apple: { provider: 'apple' },
  google: {
    provider: 'google',
    options: { queryParams: { access_type: 'offline', prompt: 'consent' } },
  },
  discord: { provider: 'discord' },
  // Unverified providers
  kakao: { provider: 'kakao' },
  twitter: { provider: 'twitter' },
  figma: { provider: 'figma' },
  github: { provider: 'github' },
  gitlab: { provider: 'gitlab' },
  facebook: { provider: 'facebook' },
  bitbucket: { provider: 'bitbucket' },
  twitch: { provider: 'twitch' },
  keycloak: { provider: 'keycloak' },
  linkedin: { provider: 'linkedin' },
  notion: { provider: 'notion' },
  slack: { provider: 'slack' },
  spotify: { provider: 'spotify' },
  zoom: { provider: 'zoom' },
  azure: { provider: 'azure' },
  workos: { provider: 'workos' },
} satisfies Record<Provider, SignInWithOAuthCredentials>;

export const SignInScreen = (): React.ReactNode => {
  const { push } = useRouter();

  const handleOAuthSignInWithPress = async (provider: Provider) => {
    const { error } = await signInWithOAuth({ provider });

    if (error) {
      console.log('OAuth Sign in failed', error);
      return;
    }

    push('/');
  };

  const handleEmailSignInWithPress = async (emailAddress, password) => {
    const res = await signIn(emailAddress, password);

    if (res.error) {
      console.log('Sign in failed', res.error);
      return;
    }

    push('/');
  };

  return (
    <YStack flex={1} justifyContent="center" alignItems="center" space>
      <SignUpSignInComponent
        type="sign-in"
        handleOAuthWithPress={handleOAuthSignInWithPress}
        handleEmailWithPress={handleEmailSignInWithPress}
      />
    </YStack>
  );
};
