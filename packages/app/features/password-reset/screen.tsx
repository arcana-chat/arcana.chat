import { YStack } from '@arcana/ui';
import { useRouter } from 'solito/navigation';
import { PasswordResetComponent } from '@arcana/ui/src/PasswordReset';
import { sendPasswordResetEmail } from 'app/utils/supabase/auth';

export function PasswordResetScreen() {
  const { push } = useRouter();

  const handleEmailWithPress = async (email) => {
    // Send email with the password reset link
    const { error } = await sendPasswordResetEmail(email);
    if (error) {
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
