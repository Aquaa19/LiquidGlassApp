// src/components/core/Spacer.tsx
import React from 'react';
import { View } from 'react-native';
import { theme } from '../../theme/theme';

type SpacingSize = 'none' | 'unit' | 'element-gap' | 'gutter' | 'section-margin' | 'container-padding';

interface SpacerProps {
  /** Size of the spacer based on design tokens */
  size?: SpacingSize;
  /** Whether the spacer is horizontal (default is vertical/block) */
  horizontal?: boolean;
}

const getSpacingValue = (size: SpacingSize): number => {
  switch (size) {
    case 'none': return 0;
    case 'unit': return theme.spacing.unit;
    case 'element-gap': return theme.spacing.elementGap;
    case 'gutter': return theme.spacing.gutter;
    case 'section-margin': return theme.spacing.sectionMargin;
    case 'container-padding': return theme.spacing.containerPadding;
    default: return theme.spacing.elementGap;
  }
};

/**
 * Core Spacer Component
 * A layout utility to create consistent gaps between elements using the design system's tokens.
 */
const Spacer: React.FC<SpacerProps> = ({ size = 'element-gap', horizontal = false }) => {
  const spacingValue = getSpacingValue(size);

  return (
    <View
      pointerEvents="none"
      importantForAccessibility="no"
      style={{
        flexShrink: 0,
        width: horizontal ? spacingValue : 0,
        height: horizontal ? 0 : spacingValue,
      }}
    />
  );
};

export default Spacer;