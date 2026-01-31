import React from "react";
import { VStack, Heading, Text, Box } from "@chakra-ui/react";

interface PageWrapperProps {
  title: string;
  description?: string;
  children: React.ReactNode;
}

export function PageWrapper({ title, description, children }: PageWrapperProps) {
  return (
    <VStack align="stretch" spacing={8} maxW="900px">
      <Box>
        <Heading size="xl" mb={2} color="figma.fg">
          {title}
        </Heading>
        {description && (
          <Text color="figma.fg_muted" fontSize="md" lineHeight="tall">
            {description}
          </Text>
        )}
      </Box>
      {children}
    </VStack>
  );
}

export function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <Box>
      <Heading size="sm" mb={4} color="figma.fg" fontWeight="600">
        {title}
      </Heading>
      <Box>{children}</Box>
    </Box>
  );
}

/** Simple code block for implementation examples. Visible in light and dark mode. */
export function CodeBlock({ code }: { code: string }) {
  return (
    <Box
      as="pre"
      fontFamily="mono"
      fontSize="sm"
      p={4}
      bg="figma.bgSubtle"
      color="figma.fg"
      borderRadius="md"
      borderWidth="1px"
      borderColor="figma.borderDefault"
      overflowX="auto"
      whiteSpace="pre"
      sx={{ "& code": { bg: "transparent", p: 0, color: "inherit" } }}
    >
      <code>{code}</code>
    </Box>
  );
}
