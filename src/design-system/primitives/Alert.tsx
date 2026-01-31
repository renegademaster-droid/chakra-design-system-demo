import React from "react";
import { Alert as ChakraAlert, AlertIcon, AlertTitle, AlertDescription } from "@chakra-ui/react";
import type { AlertProps as ChakraAlertProps } from "@chakra-ui/react";

/**
 * Alert — Chakra UI MCP component, styled by Figma tokens (theme).
 * Uses theme.radii.md (Figma Radii/md = 6px).
 */
export const Alert = React.forwardRef<HTMLDivElement, ChakraAlertProps>((props, ref) => (
  <ChakraAlert ref={ref} borderRadius="md" {...props} />
));
Alert.displayName = "Alert";

export { AlertIcon, AlertTitle, AlertDescription };
