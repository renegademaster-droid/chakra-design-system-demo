import React from "react";
import { Table as ChakraTable, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";
import type { TableProps } from "@chakra-ui/react";

interface Props extends TableProps {
  headers: string[];
  data: any[][];
}

const Table: React.FC<Props> = ({ headers, data, ...props }) => (
  <ChakraTable {...props}>
    <Thead>
      <Tr>{headers.map((h, i) => <Th key={i}>{h}</Th>)}</Tr>
    </Thead>
    <Tbody>
      {data.map((row, i) => (
        <Tr key={i}>{row.map((cell, j) => <Td key={j}>{cell}</Td>)}</Tr>
      ))}
    </Tbody>
  </ChakraTable>
);

export default Table;
