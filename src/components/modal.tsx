import React from "react";
import { Modal as ChakraModal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useToken } from "@chakra-ui/react";
import type { ModalProps } from "@chakra-ui/react";

interface Props extends ModalProps {
  title: string;
  children: React.ReactNode;
}

const Modal: React.FC<Props> = ({ title, children, ...props }) => {
  const [brand500, brand600] = useToken("colors", ["brand.500", "brand.600"]);

  return (
    <ChakraModal {...props}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{title}</ModalHeader>
        <ModalBody>{children}</ModalBody>
        <ModalFooter>
          <Button bg={brand500} _hover={{ bg: brand600 }} color="white">
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </ChakraModal>
  );
};

export default Modal;
