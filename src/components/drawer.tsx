import React from "react";
import { Drawer as ChakraDrawer, DrawerOverlay, DrawerContent, DrawerHeader, DrawerBody, DrawerFooter, Button } from "@chakra-ui/react";
import type { DrawerProps } from "@chakra-ui/react";

interface Props extends DrawerProps {
  title: string;
  children: React.ReactNode;
}

const Drawer: React.FC<Props> = ({ title, children, ...props }) => (
  <ChakraDrawer {...props}>
    <DrawerOverlay />
    <DrawerContent>
      <DrawerHeader>{title}</DrawerHeader>
      <DrawerBody>{children}</DrawerBody>
      <DrawerFooter>
        <Button>Close</Button>
      </DrawerFooter>
    </DrawerContent>
  </ChakraDrawer>
);

export default Drawer;
