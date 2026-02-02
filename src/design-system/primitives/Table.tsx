import React from "react";
import {
  Table as ChakraTable,
  Thead as ChakraThead,
  Tbody as ChakraTbody,
  Tfoot as ChakraTfoot,
  Tr as ChakraTr,
  Th as ChakraTh,
  Td as ChakraTd,
  TableCaption as ChakraTableCaption,
  TableContainer as ChakraTableContainer,
} from "@chakra-ui/react";
import type { TableProps as ChakraTableProps } from "@chakra-ui/react";

/**
 * Table — Chakra UI components, styled by Figma tokens (theme).
 * Uses figma.fg, figma.fg_muted, figma.borderDefault.
 */
export const Table = React.forwardRef<HTMLTableElement, ChakraTableProps>(
  (props, ref) => (
    <ChakraTable ref={ref} color="figma.fg" size="sm" {...props} />
  )
);
Table.displayName = "Table";

export const Thead = React.forwardRef<
  HTMLTableSectionElement,
  React.ComponentProps<typeof ChakraThead>
>((props, ref) => (
  <ChakraThead ref={ref} bg="figma.muted" borderColor="figma.borderDefault" {...props} />
));
Thead.displayName = "Thead";

export const Tbody = React.forwardRef<
  HTMLTableSectionElement,
  React.ComponentProps<typeof ChakraTbody>
>((props, ref) => <ChakraTbody ref={ref} {...props} />);
Tbody.displayName = "Tbody";

export const Tfoot = React.forwardRef<
  HTMLTableSectionElement,
  React.ComponentProps<typeof ChakraTfoot>
>((props, ref) => (
  <ChakraTfoot ref={ref} bg="figma.muted" borderColor="figma.borderDefault" {...props} />
));
Tfoot.displayName = "Tfoot";

export const Tr = ChakraTr;

export const Th = React.forwardRef<
  HTMLTableCellElement,
  React.ComponentProps<typeof ChakraTh>
>((props, ref) => (
  <ChakraTh
    ref={ref}
    color="figma.fg"
    fontWeight="600"
    fontSize="xs"
    textTransform="none"
    {...props}
  />
));
Th.displayName = "Th";

export const Td = React.forwardRef<
  HTMLTableCellElement,
  React.ComponentProps<typeof ChakraTd>
>((props, ref) => (
  <ChakraTd ref={ref} color="figma.fg_muted" borderColor="figma.borderDefault" {...props} />
));
Td.displayName = "Td";

export const TableCaption = ChakraTableCaption;
export const TableContainer = ChakraTableContainer;
