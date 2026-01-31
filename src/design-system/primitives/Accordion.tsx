import React from "react";
import {
  Accordion as ChakraAccordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
} from "@chakra-ui/react";
import type { AccordionProps as ChakraAccordionProps } from "@chakra-ui/react";

export interface AccordionItemType {
  title: string;
  content: React.ReactNode;
}

export interface AccordionProps extends Omit<ChakraAccordionProps, "children"> {
  /** List of { title, content } for a simple accordion. */
  items?: AccordionItemType[];
  children?: React.ReactNode;
}

/**
 * Accordion — Chakra UI component, styled by Figma tokens (theme).
 * Uses figma.fg, figma.fg_muted, figma.default, figma.borderDefault, figma.bgSubtle; theme.radii.md.
 */
export const Accordion = React.forwardRef<HTMLDivElement, AccordionProps>(
  ({ items, children, allowMultiple, allowToggle, defaultIndex, ...props }, ref) => {
    const content = items != null
      ? items.map((item, i) => (
          <AccordionItem key={i} borderWidth="1px" borderColor="figma.borderDefault" borderRadius="md" overflow="hidden" _notLast={{ mb: 2 }}>
            <h2>
              <AccordionButton
                bg="figma.default"
                color="figma.fg"
                fontWeight="600"
                fontSize="sm"
                py={3}
                px={4}
                _hover={{ bg: "figma.bgSubtle" }}
                _expanded={{ bg: "figma.bgSubtle", borderBottomWidth: "1px", borderColor: "figma.borderDefault" }}
              >
                <Box flex="1" textAlign="left">
                  {item.title}
                </Box>
                <AccordionIcon color="figma.fg_muted" />
              </AccordionButton>
            </h2>
            <AccordionPanel
              bg="figma.bgSubtle"
              color="figma.fg_muted"
              fontSize="sm"
              lineHeight="tall"
              py={3}
              px={4}
            >
              {item.content}
            </AccordionPanel>
          </AccordionItem>
        ))
      : children;

    return (
      <ChakraAccordion
        ref={ref}
        allowMultiple={allowMultiple}
        allowToggle={allowToggle ?? true}
        defaultIndex={defaultIndex}
        {...props}
      >
        {content}
      </ChakraAccordion>
    );
  }
);
Accordion.displayName = "Accordion";

(
  Accordion as unknown as React.FC & {
    Item: typeof AccordionItem;
    Button: typeof AccordionButton;
    Panel: typeof AccordionPanel;
    Icon: typeof AccordionIcon;
  }
).Item = AccordionItem;
(
  Accordion as unknown as React.FC & {
    Item: typeof AccordionItem;
    Button: typeof AccordionButton;
    Panel: typeof AccordionPanel;
    Icon: typeof AccordionIcon;
  }
).Button = AccordionButton;
(
  Accordion as unknown as React.FC & {
    Item: typeof AccordionItem;
    Button: typeof AccordionButton;
    Panel: typeof AccordionPanel;
    Icon: typeof AccordionIcon;
  }
).Panel = AccordionPanel;
(
  Accordion as unknown as React.FC & {
    Item: typeof AccordionItem;
    Button: typeof AccordionButton;
    Panel: typeof AccordionPanel;
    Icon: typeof AccordionIcon;
  }
).Icon = AccordionIcon;
