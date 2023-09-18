import { BlurView as ExpoBlurView, BlurViewProps as ExpoBlurViewProps } from 'expo-blur';

import { GetProps, styled } from '@tamagui/core';

const BLUR_VIEW_NAME = 'BlurView';

export type BlurViewProps = {
  /**
   * A number from `0` to `1000` to control how saturated the blur effect should be.
   * @web -- will not apply on native
   */
  saturation?: number;
} & ExpoBlurViewProps;

/**
 * A cross platform BlurView component that uses `expo-blur` for iOS and Web, and `@react-native-community/blur` for Android.
 * They translate the same props between all three platforms.
 */
const BlurViewFrame = styled(ExpoBlurView, {
  name: BLUR_VIEW_NAME,
});

export const BlurView = BlurViewFrame.styleable<GetProps<typeof BlurViewFrame> & BlurViewProps>((props, ref) => (
  <BlurViewFrame ref={ref} {...props} />
));
