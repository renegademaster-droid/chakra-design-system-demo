import React from "react";
import { Spinner as ChakraSpinner } from "@chakra-ui/react";
import type { SpinnerProps } from "@chakra-ui/react";

const Spinner: React.FC<SpinnerProps> = (props) => <ChakraSpinner {...props} />;

export default Spinner;
