import { useRouter } from 'solito/router';

import { YStack, useToastController } from '@arcana/ui';

import { PasswordResetComponent } from 'app/components/PasswordReset';
import { isExpoGo } from 'app/utils/flags';
import { useSupabase } from 'app/utils/supabase/hooks/useSupabase';

export function PasswordResetScreen() {
  const { push } = useRouter();
  const toast = useToastController();
  const supabase = useSupabase();

  const handleEmailWithPress = async (email) => {
    // Send email with the password reset link
    const { error } = await supabase.auth.resetPasswordForEmail(email);
    if (error) {
      if (!isExpoGo) {
        toast.show('Password reset request failed', {
          description: error.message,
        });
      }
      console.log('Password reset request failed', error);
      return;
    }

    push('/');
  };

  return (
    <YStack flex={1} justifyContent="center" alignItems="center" space>
      <PasswordResetComponent type="email" handleWithPress={handleEmailWithPress} />
    </YStack>
  );
}
