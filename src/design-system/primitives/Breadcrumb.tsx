import React from "react";
import {
  Breadcrumb as ChakraBreadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
} from "@chakra-ui/react";
import type { BreadcrumbProps as ChakraBreadcrumbProps } from "@chakra-ui/react";

/**
 * Breadcrumb — Chakra UI MCP component, styled by Figma tokens (theme).
 */
export const Breadcrumb = React.forwardRef<HTMLElement, ChakraBreadcrumbProps>((props, ref) => (
  <ChakraBreadcrumb ref={ref} fontSize="sm" color="gray.600" {...props} />
));
Breadcrumb.displayName = "Breadcrumb";

export { BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator };
