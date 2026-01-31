import React from "react";
import { Button } from "@chakra-ui/react";
import type { ButtonProps } from "@chakra-ui/react";

interface Props extends ButtonProps {
  label?: string;
}

/** Uses Figma spacing tokens (theme.space) for padding: Spacing/2=8px, Size/4=16px */
const SemanticButton: React.FC<Props> = ({ label, children, ...props }) => (
  <Button
    size="md"
    borderRadius="md"
    colorScheme="teal"
    px="4"
    py="2"
    {...props}
  >
    {label ?? children}
  </Button>
);

export default SemanticButton;
