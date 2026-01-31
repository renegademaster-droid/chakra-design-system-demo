import React from "react";
import { Tabs as ChakraTabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import type { TabsProps } from "@chakra-ui/react";

interface Props extends TabsProps {
  tabs: { label: string; content: React.ReactNode }[];
}

const Tabs: React.FC<Props> = ({ tabs, ...props }) => (
  <ChakraTabs {...props}>
    <TabList>{tabs.map((t, i) => <Tab key={i}>{t.label}</Tab>)}</TabList>
    <TabPanels>{tabs.map((t, i) => <TabPanel key={i}>{t.content}</TabPanel>)}</TabPanels>
  </ChakraTabs>
);

export default Tabs;
