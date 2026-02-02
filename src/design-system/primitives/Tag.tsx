import React from "react";
import {
  Tag as ChakraTag,
  TagLabel as ChakraTagLabel,
  TagLeftIcon as ChakraTagLeftIcon,
  TagRightIcon as ChakraTagRightIcon,
  TagCloseButton as ChakraTagCloseButton,
} from "@chakra-ui/react";
import type { TagProps as ChakraTagProps } from "@chakra-ui/react";

/**
 * Tag — Chakra UI component, styled by Figma tokens (theme).
 * Uses theme.radii.md; colorScheme teal by default.
 */
export const Tag = React.forwardRef<HTMLSpanElement, ChakraTagProps>(
  (props, ref) => (
    <ChakraTag ref={ref} colorScheme="teal" borderRadius="md" size="md" {...props} />
  )
);
Tag.displayName = "Tag";

export const TagLabel = ChakraTagLabel;
export const TagLeftIcon = ChakraTagLeftIcon;
export const TagRightIcon = ChakraTagRightIcon;
export const TagCloseButton = ChakraTagCloseButton;
