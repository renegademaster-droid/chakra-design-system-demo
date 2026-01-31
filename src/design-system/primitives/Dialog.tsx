import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
} from "@chakra-ui/react";
import type { ModalProps } from "@chakra-ui/react";

export interface DialogProps extends ModalProps {
  title?: string;
  footer?: React.ReactNode;
}

/**
 * Dialog — Chakra Modal, styled by Figma tokens (theme).
 * Uses figma.default, figma.borderDefault, figma.fg, figma.fg_muted; theme.radii.lg.
 */
export function Dialog({
  title,
  footer,
  children,
  ...modalProps
}: DialogProps) {
  return (
    <Modal {...modalProps}>
      <ModalOverlay bg="blackAlpha.600" />
      <ModalContent
        bg="figma.default"
        borderWidth="1px"
        borderColor="figma.borderDefault"
        borderRadius="lg"
        color="figma.fg"
      >
        {title != null && (
          <ModalHeader color="figma.fg" fontWeight="600" fontSize="lg">
            {title}
          </ModalHeader>
        )}
        <ModalCloseButton color="figma.fg_muted" _hover={{ color: "figma.fg" }} aria-label="Close" />
        <ModalBody color="figma.fg_muted" pt={title == null ? 6 : 0}>
          {children}
        </ModalBody>
        {footer != null && (
          <ModalFooter borderTopWidth="1px" borderColor="figma.borderDefault" pt={4}>
            {footer}
          </ModalFooter>
        )}
      </ModalContent>
    </Modal>
  );
}

Dialog.Overlay = ModalOverlay;
Dialog.Content = ModalContent;
Dialog.Header = ModalHeader;
Dialog.Body = ModalBody;
Dialog.Footer = ModalFooter;
Dialog.CloseButton = ModalCloseButton;
