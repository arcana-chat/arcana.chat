import { useRouter } from 'solito/navigation';

import { YStack } from '@arcana/ui';
import { PasswordResetComponent } from '@arcana/ui/src/PasswordReset';

import { updatePassword } from 'app/utils/supabase/auth';

export function UpdatePasswordScreen() {
  const { push } = useRouter();

  const handlePasswordWithPress = async (password) => {
    // Update the password
    const { error } = await updatePassword(password);
    if (error) {
      console.log('Password change failed', error);
      return;
    }

    push('/');
  };

  return (
    <YStack flex={1} justifyContent="center" alignItems="center" space>
      <PasswordResetComponent type="password" handleWithPress={handlePasswordWithPress} />
    </YStack>
  );
}
