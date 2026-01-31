import React from "react";
import {
  Menu as ChakraMenu,
  MenuButton as ChakraMenuButton,
  MenuList as ChakraMenuList,
  MenuItem as ChakraMenuItem,
  MenuDivider,
  MenuGroup,
  MenuOptionGroup,
  MenuItemOption,
} from "@chakra-ui/react";
import type { MenuProps } from "@chakra-ui/react";

export interface MenuPropsExtended extends MenuProps {}

/**
 * Menu — Chakra UI component, styled by Figma tokens (theme).
 * Uses figma.bgPanel (panel), figma.borderDefault, figma.fg, figma.bgSubtle; theme.radii.sm; shadow from Figma (Shadows light/lg).
 */
export function Menu(props: MenuPropsExtended) {
  return <ChakraMenu {...props} />;
}

export const MenuButton = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<typeof ChakraMenuButton>
>((props, ref) => (
  <ChakraMenuButton
    ref={ref}
    bg="figma.default"
    borderWidth="1px"
    borderColor="figma.borderDefault"
    color="figma.fg"
    borderRadius="sm"
    py={2}
    px={4}
    gap={2}
    _hover={{ bg: "figma.bgSubtle" }}
    _expanded={{ bg: "figma.bgSubtle", borderColor: "figma.fg_muted" }}
    {...props}
  />
));
MenuButton.displayName = "MenuButton";
Menu.Button = MenuButton;

export const MenuList = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<typeof ChakraMenuList>
>((props, ref) => (
  <ChakraMenuList
    ref={ref}
    bg="figma.bgPanel"
    borderWidth="1px"
    borderColor="figma.borderDefault"
    borderRadius="sm"
    py={2}
    px={1}
    minW="min"
    boxShadow="0 8px 16px rgba(24, 24, 27, 0.1), 0 0 1px rgba(24, 24, 27, 0.3)"
    {...props}
  />
));
MenuList.displayName = "MenuList";
Menu.List = MenuList;

export const MenuItem = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<typeof ChakraMenuItem>
>((props, ref) => (
  <ChakraMenuItem
    ref={ref}
    color="figma.fg"
    fontSize="sm"
    py={2}
    px={3}
    _focus={{ bg: "figma.bgSubtle" }}
    _active={{ bg: "figma.bgSubtle" }}
    _hover={{ bg: "figma.bgSubtle" }}
    {...props}
  />
));
MenuItem.displayName = "MenuItem";
Menu.Item = MenuItem;

Menu.Divider = MenuDivider;
Menu.Group = MenuGroup;
Menu.OptionGroup = MenuOptionGroup;
Menu.ItemOption = MenuItemOption;
