import React from "react";
import { Alert as ChakraAlert, AlertIcon, AlertTitle, AlertDescription } from "@chakra-ui/react";
import type { AlertProps } from "@chakra-ui/react";

interface Props extends AlertProps {
  title?: string;
  description?: string;
}

const Alert: React.FC<Props> = ({ title, description, ...props }) => (
  <ChakraAlert {...props}>
    <AlertIcon />
    {title && <AlertTitle>{title}</AlertTitle>}
    {description && <AlertDescription>{description}</AlertDescription>}
  </ChakraAlert>
);

export default Alert;
