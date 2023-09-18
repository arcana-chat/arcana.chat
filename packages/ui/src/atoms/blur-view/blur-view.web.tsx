import { forwardRef, useMemo } from 'react';

import { Stack, StackProps, TamaguiElement, styled } from '@tamagui/core';

// https://github.com/expo/expo/blob/main/packages/expo-blur/src/BlurView.web.tsx

export type BlurTint = 'light' | 'dark' | 'default';

export type BlurViewProps = {
  /**
   * A tint mode which will be applied to the view.
   * @default 'default'
   */
  tint?: BlurTint;
  /**
   * A number from `1` to `100` to control the intensity of the blur effect.
   *
   * On web, you can take this number as high as you want. We cap it at
   * `100` on native though.
   *
   * You can animate this property using `Animated API` from React Native or using `react-native-reanimated`.
   * > Animating this property using `Animated API` from React Native with `setNativeDriver: true` does not work.
   *
   * @default 50
   */
  intensity?: number;

  /**
   * A number from `0` to `1000` to control how saturated the blur effect should be.
   * @web
   */
  saturation?: number;
} & StackProps;

/**
 * @links
 * https://developer.mozilla.org/en-US/docs/Web/API/CSS/supports
 * https://developer.mozilla.org/en-US/docs/Web/CSS/backdrop-filter#Browser_compatibility
 */
const isBlurSupported = () =>
  typeof CSS !== 'undefined' &&
  (CSS.supports('-webkit-backdrop-filter', 'blur(1px)') ||
    CSS.supports('backdrop-filter', 'blur(1px)'));

const StyledBlurView = styled(Stack, {
  name: 'BlurView',

  width: '100%',
  height: '100%',
  position: 'absolute',
  top: 0,
  left: 0,
});

export const BlurView = forwardRef<TamaguiElement, BlurViewProps>(
  ({ intensity = 50, tint = 'default', saturation, style, ...rest }, ref) => {
    const backgroundColor = useMemo(() => {
      const opacity = Math.min(intensity, 100) / 100;

      return {
        dark: `rgba(25,25,25,${opacity * 0.78})`,
        light: `rgba(249,249,249,${opacity * 0.78})`,
        default: `rgba(255,255,255,${opacity * 0.3})`,
      }[tint];
    }, [tint, intensity]);

    const blur = useMemo(
      () =>
        [`blur(${intensity * 0.2}px)`, saturation && `saturate(${saturation}%);`]
          .filter(Boolean)
          .join(' '),
      [intensity, saturation]
    );

    return (
      <StyledBlurView
        ref={ref}
        style={[
          style,
          {
            backgroundColor,
            ...(isBlurSupported() && { backdropFilter: blur, WebkitBackdropFilter: blur }),
          },
        ]}
        {...rest}
      />
    );
  }
);
