import React from "react";
import { Box, VStack, HStack, Heading, Text } from "@chakra-ui/react";
import Button from "./button";
import Card from "./card";
import Modal from "./modal";

interface Props {
  onLogout: () => void;
}

const Dashboard: React.FC<Props> = ({ onLogout }) => {
  const [isModalOpen, setModalOpen] = React.useState(false);

  return (
    <Box p={8}>
      <HStack justify="space-between" mb={6}>
        <Heading size="lg">Dashboard</Heading>
        <Button label="Logout" variant="outline" colorScheme="teal" onClick={onLogout} />
      </HStack>

      <VStack spacing={4} align="stretch">
        <Card>
          <Text>Welcome to the dashboard!</Text>
          <Button label="Open Modal" colorScheme="teal" mt={2} onClick={() => setModalOpen(true)} />
        </Card>

        <Card>
          <Text>Another card component</Text>
        </Card>
      </VStack>

      <Modal
        title="Example Modal"
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
      >
        <Text>This is a modal content</Text>
      </Modal>
    </Box>
  );
};

export default Dashboard;
