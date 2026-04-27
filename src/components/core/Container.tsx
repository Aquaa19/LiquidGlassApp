// src/components/core/Container.tsx
import React from 'react';
import { View, ViewStyle, StyleProp } from 'react-native';
import { theme } from '../../theme/theme';

type SpacingSize = 'none' | 'unit' | 'element-gap' | 'gutter' | 'section-margin' | 'container-padding';

interface ContainerProps {
  /** Flex direction: row or col */
  direction?: 'row' | 'col';
  /** Spacing between items using design tokens */
  gap?: SpacingSize;
  /** Horizontal alignment */
  align?: 'flex-start' | 'center' | 'flex-end' | 'stretch' | 'baseline';
  /** Vertical alignment */
  justify?: 'flex-start' | 'center' | 'flex-end' | 'space-between' | 'space-around' | 'space-evenly';
  /** Allow wrapping */
  wrap?: 'wrap' | 'nowrap';
  /** Additional React Native styles */
  style?: StyleProp<ViewStyle>;
  children: React.ReactNode;
}

const getGapValue = (gapSize: SpacingSize): number => {
  switch (gapSize) {
    case 'none': return 0;
    case 'unit': return theme.spacing.unit;
    case 'element-gap': return theme.spacing.elementGap;
    case 'gutter': return theme.spacing.gutter;
    case 'section-margin': return theme.spacing.sectionMargin;
    case 'container-padding': return theme.spacing.containerPadding;
    default: return 0;
  }
};

/**
 * Core Container Component
 * A flexible layout primitive for building consistent flex structures in React Native.
 * Note: Grid layout from the web version is removed as React Native relies strictly on Flexbox.
 */
const Container: React.FC<ContainerProps> = ({
  direction = 'col',
  gap = 'element-gap',
  align = 'stretch',
  justify = 'flex-start',
  wrap = 'nowrap',
  style,
  children,
}) => {
  const dynamicStyle: ViewStyle = {
    flexDirection: direction === 'row' ? 'row' : 'column',
    alignItems: align,
    justifyContent: justify,
    flexWrap: wrap,
    gap: getGapValue(gap), // React Native now supports the 'gap' property
  };

  return (
    <View style={[dynamicStyle, style]}>
      {children}
    </View>
  );
};

export default Container;