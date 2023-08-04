import { createFont } from 'tamagui';

/**
 * Inspired from:
 * LibreCaslonCondensed-Bold.ttf
 * LibreCaslonCondensed-BoldItalic.ttf
 * LibreCaslonCondensed-Italic.ttf
 * LibreCaslonCondensed-Medium.ttf
 * LibreCaslonCondensed-MediumItalic.ttf
 * LibreCaslonCondensed-Regular.ttf
 * LibreCaslonCondensed-SemiBold.ttf
 * LibreCaslonCondensed-SemiBoldItalic.ttf
 *
 * @see fonts.css
 */

export const libreCalsonFont = createFont({
  family: '"Libre Calson Condensed", Helvetica, Arial, sans-serif',
  size: {
    1: 12,
    2: 14,
    3: 15,
  },
  lineHeight: {
    1: 17,
    2: 22,
    3: 25,
  },
  weight: {
    4: '400',
    5: '500',
    6: '600',
    7: '700',
  },
  letterSpacing: {
    4: 1,
    8: -1,
  },

  // @native
  face: {
    400: { normal: 'LibreCalsonCondensed-Regular', italic: 'LibreCalsonCondensed-Italic' },
    500: { normal: 'LibreCalsonCondensed-Medium', italic: 'LibreCalsonCondensed-MediumItalic' },
    600: { normal: 'LibreCalsonCondensed-SemiBold', italic: 'LibreCalsonCondensed-SemiBoldItalic' },
    700: { normal: 'LibreCalsonCondensed-Bold', italic: 'LibreCalsonCondensed-BoldItalic' },
  },
});
