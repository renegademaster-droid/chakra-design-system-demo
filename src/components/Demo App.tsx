import { useState } from "react";
import { ChakraProvider } from "@chakra-ui/react";
import Button from "./button";
import Card from "./card";
import Modal from "./modal";

export default function App() {
  const [isModalOpen, setModalOpen] = useState(false);

  return (
    <ChakraProvider>
      <Card>
        <p>Hello, this is a Card component!</p>
        <Button label="Open Modal" colorScheme="teal" onClick={() => setModalOpen(true)} />
      </Card>

      <Modal
        title="Example Modal"
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
      >
        <p>This content uses MCP tokens!</p>
      </Modal>
    </ChakraProvider>
  );
}
