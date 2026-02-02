import React from "react";
import {
  Tabs as ChakraTabs,
  TabList as ChakraTabList,
  TabPanels as ChakraTabPanels,
  Tab as ChakraTab,
  TabPanel as ChakraTabPanel,
} from "@chakra-ui/react";
import type {
  TabsProps as ChakraTabsProps,
  TabListProps as ChakraTabListProps,
  TabPanelsProps as ChakraTabPanelsProps,
  TabProps as ChakraTabProps,
  TabPanelProps as ChakraTabPanelProps,
} from "@chakra-ui/react";

/**
 * Tabs — Chakra UI component, styled by Figma tokens (theme).
 * Uses figma.fg, figma.fg_muted, figma.borderDefault; theme.radii.md.
 */
export const Tabs = React.forwardRef<HTMLDivElement, ChakraTabsProps>(
  (props, ref) => <ChakraTabs ref={ref} colorScheme="teal" variant="line" {...props} />
);
Tabs.displayName = "Tabs";

export const TabList = React.forwardRef<HTMLDivElement, ChakraTabListProps>(
  (props, ref) => (
    <ChakraTabList
      ref={ref}
      borderColor="figma.borderDefault"
      borderBottomWidth="1px"
      gap={6}
      {...props}
    />
  )
);
TabList.displayName = "TabList";

export const TabPanels = React.forwardRef<HTMLDivElement, ChakraTabPanelsProps>(
  (props, ref) => <ChakraTabPanels ref={ref} {...props} />
);
TabPanels.displayName = "TabPanels";

export const Tab = React.forwardRef<HTMLButtonElement, ChakraTabProps>(
  (props, ref) => (
    <ChakraTab
      ref={ref}
      color="figma.fg_muted"
      _selected={{ color: "teal.600", borderColor: "teal.500" }}
      fontWeight="500"
      {...props}
    />
  )
);
Tab.displayName = "Tab";

export const TabPanel = React.forwardRef<HTMLDivElement, ChakraTabPanelProps>(
  (props, ref) => (
    <ChakraTabPanel ref={ref} pt={4} color="figma.fg" {...props} />
  )
);
TabPanel.displayName = "TabPanel";
