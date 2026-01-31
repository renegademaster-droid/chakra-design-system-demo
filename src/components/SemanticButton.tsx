import React from "react";
import { Button } from "@chakra-ui/react";

interface Props {
  label: string;
}

const SemanticButton: React.FC<Props> = ({ label }) => {
  return (
    <Button
      bg="blue.500"          // Global token Figmasta
      color="white"
      _hover={{ bg: "blue.600" }}  // Hover token
      size="md"
      borderRadius="md"
    >
      {label}
    </Button>
  );
};

export default SemanticButton;
