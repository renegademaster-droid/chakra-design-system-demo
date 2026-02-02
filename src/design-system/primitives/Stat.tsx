import React from "react";
import {
  Stat as ChakraStat,
  StatLabel as ChakraStatLabel,
  StatNumber as ChakraStatNumber,
  StatHelpText as ChakraStatHelpText,
  StatArrow as ChakraStatArrow,
  StatGroup as ChakraStatGroup,
} from "@chakra-ui/react";
import type {
  StatProps as ChakraStatProps,
  StatLabelProps as ChakraStatLabelProps,
  StatNumberProps as ChakraStatNumberProps,
  StatHelpTextProps as ChakraStatHelpTextProps,
} from "@chakra-ui/react";

/**
 * Stat — Chakra UI components, styled by Figma tokens (theme).
 * Uses figma.fg, figma.fg_muted.
 */
export const Stat = React.forwardRef<HTMLDivElement, ChakraStatProps>(
  (props, ref) => <ChakraStat ref={ref} {...props} />
);
Stat.displayName = "Stat";

export const StatLabel = React.forwardRef<HTMLDivElement, ChakraStatLabelProps>(
  (props, ref) => (
    <ChakraStatLabel ref={ref} color="figma.fg_muted" fontSize="sm" fontWeight="500" {...props} />
  )
);
StatLabel.displayName = "StatLabel";

export const StatNumber = React.forwardRef<HTMLSpanElement, ChakraStatNumberProps>(
  (props, ref) => (
    <ChakraStatNumber ref={ref} color="figma.fg" fontSize="2xl" fontWeight="700" {...props} />
  )
);
StatNumber.displayName = "StatNumber";

export const StatHelpText = React.forwardRef<HTMLSpanElement, ChakraStatHelpTextProps>(
  (props, ref) => (
    <ChakraStatHelpText ref={ref} color="figma.fg_muted" fontSize="sm" {...props} />
  )
);
StatHelpText.displayName = "StatHelpText";

export const StatArrow = ChakraStatArrow;
export const StatGroup = ChakraStatGroup;
