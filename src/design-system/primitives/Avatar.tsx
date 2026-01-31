import React from "react";
import { Avatar as ChakraAvatar } from "@chakra-ui/react";
import type { AvatarProps as ChakraAvatarProps } from "@chakra-ui/react";

/**
 * Avatar — Chakra UI MCP component, styled by Figma tokens (theme).
 */
export const Avatar = React.forwardRef<HTMLDivElement, ChakraAvatarProps>((props, ref) => (
  <ChakraAvatar ref={ref} {...props} />
));
Avatar.displayName = "Avatar";
