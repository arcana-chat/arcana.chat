import { useLink, useParams } from 'solito/navigation';

import { ChevronLeft } from '@tamagui/lucide-icons';

import { Button, H2, Paragraph, YStack } from '@arcana/ui';

export const ParamsScreen = (): React.ReactNode => {
  const { id } = useParams<{ id: string }>();
  const link = useLink({
    href: '/',
  });

  return (
    <YStack flex={1} justifyContent="center" alignItems="center" space>
      <H2 textAlign="center" space="$4">
        This value is passed via params
      </H2>
      <Paragraph textAlign="center" fontWeight="700">{`User ID: ${id}`}</Paragraph>
      <Button {...link} icon={ChevronLeft}>
        Go Home
      </Button>
    </YStack>
  );
};
