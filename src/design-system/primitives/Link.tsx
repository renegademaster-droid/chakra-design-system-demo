import React from "react";
import { Link as ChakraLink } from "@chakra-ui/react";
import type { LinkProps as ChakraLinkProps } from "@chakra-ui/react";

/**
 * Link — Chakra UI MCP component, styled by Figma tokens (theme).
 */
export const Link = React.forwardRef<HTMLAnchorElement, ChakraLinkProps>(
  ({ color = "teal.600", textDecoration = "underline", _hover = {}, ...props }, ref) => (
    <ChakraLink
      ref={ref}
      color={color}
      textDecoration={textDecoration}
      fontFamily="body"
      fontWeight="500"
      _hover={{ color: "teal.700", ..._hover }}
      {...props}
    />
  )
);
Link.displayName = "Link";
