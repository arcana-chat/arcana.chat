import { useRouter } from 'solito/navigation';

import { Provider } from '@supabase/supabase-js';

import { YStack } from '@arcana/ui';

import { SignUpSignInComponent } from 'app/components/SignUpSignIn';
import { signUp } from 'app/utils/supabase';
import { signInWithOAuth } from 'app/utils/supabase/auth';

export const SignUpScreen = (): React.ReactNode => {
  const { push } = useRouter();

  const handleOAuthSignInWithPress = async (provider: Provider) => {
    const { error } = await signInWithOAuth({ provider: provider });

    if (error) {
      console.log('OAuth Sign in failed', error);
      return;
    }

    push('/');
  };

  const handleEmailSignUpWithPress = async (emailAddress, password) => {
    const res = await signUp(emailAddress, password);

    if (res.error) {
      console.log('Sign up failed', res.error);
      return;
    }

    push('/');
  };

  return (
    <YStack flex={1} justifyContent="center" alignItems="center" space>
      <SignUpSignInComponent
        type="sign-up"
        handleOAuthWithPress={handleOAuthSignInWithPress}
        handleEmailWithPress={handleEmailSignUpWithPress}
      />
    </YStack>
  );
};
