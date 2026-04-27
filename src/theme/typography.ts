import { TextStyle } from 'react-native';

export const typography: Record<string, TextStyle> = {
  displayXl: {
    fontFamily: 'Inter',
    fontSize: 64,
    fontWeight: '800',
    lineHeight: 70, // 64 * 1.1
    letterSpacing: -2.56, // 64 * -0.04
  },
  headlineLg: {
    fontFamily: 'Inter',
    fontSize: 40,
    fontWeight: '700',
    lineHeight: 48, // 40 * 1.2
    letterSpacing: -0.8, // 40 * -0.02
  },
  headlineMd: {
    fontFamily: 'Inter',
    fontSize: 24,
    fontWeight: '600',
    lineHeight: 31, // 24 * 1.3
    letterSpacing: -0.24, // 24 * -0.01
  },
  bodyBase: {
    fontFamily: 'Inter',
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 26, // 16 * 1.6
    letterSpacing: 0,
  },
  labelSm: {
    fontFamily: 'Inter',
    fontSize: 13,
    fontWeight: '600',
    lineHeight: 13, // 13 * 1
    letterSpacing: 0.26, // 13 * 0.02
  },
};