import React from "react";
import { FormControl, FormLabel, Input, FormErrorMessage } from "@chakra-ui/react";
import type { InputProps } from "@chakra-ui/react";

interface InputFieldProps extends InputProps {
  label: string;
  error?: string;
  isRequired?: boolean;
}

const InputField: React.FC<InputFieldProps> = ({ label, error, isRequired = false, ...props }) => (
  <FormControl isInvalid={!!error} isRequired={isRequired} mb={4}>
    <FormLabel>{label}</FormLabel>
    <Input {...props} />
    {error && <FormErrorMessage>{error}</FormErrorMessage>}
  </FormControl>
);

export default InputField;
