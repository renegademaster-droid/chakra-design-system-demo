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
 * Uses figma.default, figma.borderDefault, figma.fg, figma.bgSubtle; theme.radii.md.
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
    borderRadius="md"
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
    bg="figma.default"
    borderWidth="1px"
    borderColor="figma.borderDefault"
    borderRadius="md"
    py={1}
    boxShadow="md"
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
    _focus={{ bg: "figma.bgSubtle" }}
    _active={{ bg: "figma.bgSubtle" }}
    {...props}
  />
));
MenuItem.displayName = "MenuItem";
Menu.Item = MenuItem;

Menu.Divider = MenuDivider;
Menu.Group = MenuGroup;
Menu.OptionGroup = MenuOptionGroup;
Menu.ItemOption = MenuItemOption;
