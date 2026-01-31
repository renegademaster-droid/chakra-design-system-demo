import React from "react";
import { Accordion as ChakraAccordion, AccordionItem, AccordionButton, AccordionPanel, Box } from "@chakra-ui/react";
import type { AccordionProps } from "@chakra-ui/react";

interface Props extends AccordionProps {
  items: { title: string; content: React.ReactNode }[];
}

const Accordion: React.FC<Props> = ({ items, ...props }) => (
  <ChakraAccordion {...props}>
    {items.map((item, i) => (
      <AccordionItem key={i}>
        <h2>
          <AccordionButton>
            <Box flex="1" textAlign="left">{item.title}</Box>
          </AccordionButton>
        </h2>
        <AccordionPanel>{item.content}</AccordionPanel>
      </AccordionItem>
    ))}
  </ChakraAccordion>
);

export default Accordion;
