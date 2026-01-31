import React from "react";
import { Box, VStack, FormControl, FormLabel, Input } from "@chakra-ui/react";
import Button from "./button";

interface Props {
  onLogin: () => void;
}

const LoginScreen: React.FC<Props> = ({ onLogin }) => {
  return (
    <Box
      minH="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      bg="gray.50"
      px={4}
    >
      <Box
        w="100%"
        maxW="400px"
        bg="white"
        borderRadius="lg"
        boxShadow="lg"
        p={6}
      >
        <VStack spacing={4}>
          <FormControl id="email">
            <FormLabel>Email</FormLabel>
            <Input type="email" placeholder="you@example.com" />
          </FormControl>
          <FormControl id="password">
            <FormLabel>Password</FormLabel>
            <Input type="password" placeholder="••••••••" />
          </FormControl>
          <Button width="100%" label="Login" colorScheme="teal" onClick={onLogin} />
        </VStack>
      </Box>
    </Box>
  );
};

export default LoginScreen;
