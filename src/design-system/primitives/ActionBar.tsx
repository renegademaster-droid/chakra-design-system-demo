import React from "react";
import { Flex } from "@chakra-ui/react";
import type { FlexProps } from "@chakra-ui/react";

export interface ActionBarProps extends FlexProps {
  /** Align actions: "start" | "end" | "center" | "space-between" */
  justify?: "start" | "end" | "center" | "space-between";
}

/**
 * ActionBar — Horizontal bar for primary actions, styled by Figma tokens (theme).
 * Uses figma.actionBarBg, figma.actionBarBorder, figma.actionBarFg; theme.radii.md, theme.space.
 */
export const ActionBar = React.forwardRef<HTMLDivElement, ActionBarProps>(
  (
    {
      justify = "end",
      gap = 3,
      py = 3,
      px = 4,
      bg = "figma.actionBarBg",
      borderWidth = "1px",
      borderColor = "figma.actionBarBorder",
      borderRadius = "md",
      color = "figma.actionBarFg",
      alignItems = "center",
      flexWrap = "wrap",
      ...props
    },
    ref
  ) => (
    <Flex
      ref={ref}
      role="toolbar"
      align={alignItems}
      justify={justify === "start" ? "flex-start" : justify === "end" ? "flex-end" : justify}
      gap={gap}
      py={py}
      px={px}
      bg={bg}
      borderWidth={borderWidth}
      borderColor={borderColor}
      borderRadius={borderRadius}
      color={color}
      flexWrap={flexWrap}
      {...props}
    />
  )
);
ActionBar.displayName = "ActionBar";
