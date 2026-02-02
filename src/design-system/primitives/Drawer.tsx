import React from "react";
import {
  Drawer as ChakraDrawer,
  DrawerOverlay as ChakraDrawerOverlay,
  DrawerContent as ChakraDrawerContent,
  DrawerHeader as ChakraDrawerHeader,
  DrawerBody as ChakraDrawerBody,
  DrawerFooter as ChakraDrawerFooter,
  DrawerCloseButton as ChakraDrawerCloseButton,
} from "@chakra-ui/react";
/**
 * Drawer — Chakra UI component, styled by Figma tokens (theme).
 * Uses figma.default, figma.fg, figma.borderDefault.
 */
export const Drawer = ChakraDrawer;
export const DrawerOverlay = ChakraDrawerOverlay;

export const DrawerContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<typeof ChakraDrawerContent>
>((props, ref) => (
  <ChakraDrawerContent
    ref={ref}
    bg="figma.default"
    color="figma.fg"
    borderColor="figma.borderDefault"
    {...props}
  />
));
DrawerContent.displayName = "DrawerContent";

export const DrawerHeader = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<typeof ChakraDrawerHeader>
>((props, ref) => (
  <ChakraDrawerHeader ref={ref} color="figma.fg" borderColor="figma.borderDefault" {...props} />
));
DrawerHeader.displayName = "DrawerHeader";

export const DrawerBody = ChakraDrawerBody;
export const DrawerFooter = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<typeof ChakraDrawerFooter>
>((props, ref) => (
  <ChakraDrawerFooter ref={ref} borderTopWidth="1px" borderColor="figma.borderDefault" {...props} />
));
DrawerFooter.displayName = "DrawerFooter";

export const DrawerCloseButton = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<typeof ChakraDrawerCloseButton>
>((props, ref) => (
  <ChakraDrawerCloseButton
    ref={ref}
    color="figma.fg_muted"
    _hover={{ color: "figma.fg" }}
    aria-label="Close"
    {...props}
  />
));
DrawerCloseButton.displayName = "DrawerCloseButton";
