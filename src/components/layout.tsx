import React from "react";
import { VStack, HStack, Flex } from "@chakra-ui/react";
import type { BoxProps, StackProps } from "@chakra-ui/react";

export const VStackLayout: React.FC<StackProps> = ({ children, ...props }) => <VStack {...props}>{children}</VStack>;
export const HStackLayout: React.FC<StackProps> = ({ children, ...props }) => <HStack {...props}>{children}</HStack>;
export const FlexLayout: React.FC<BoxProps> = ({ children, ...props }) => <Flex {...props}>{children}</Flex>;
