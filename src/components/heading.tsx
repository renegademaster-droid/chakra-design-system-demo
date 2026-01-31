import React from "react";
import { Heading as ChakraHeading } from "@chakra-ui/react";
import type { HeadingProps } from "@chakra-ui/react";

interface Props extends HeadingProps {
  children: React.ReactNode;
  size?: "sm" | "md" | "lg" | "xl";
}

const Heading: React.FC<Props> = ({ children, size = "md", ...props }) => (
  <ChakraHeading size={size} {...props}>{children}</ChakraHeading>
);

export default Heading;
