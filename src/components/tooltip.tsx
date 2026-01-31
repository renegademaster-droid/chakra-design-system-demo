import React from "react";
import { Tooltip as ChakraTooltip } from "@chakra-ui/react";
import type { TooltipProps } from "@chakra-ui/react";

interface Props extends TooltipProps {
  label: string;
  children: React.ReactNode;
}

const Tooltip: React.FC<Props> = ({ label, children, ...props }) => (
  <ChakraTooltip label={label} {...props}>
    {children}
  </ChakraTooltip>
);

export default Tooltip;
