import { HStack, Button, Text } from "@chakra-ui/react";

export interface PaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  showPrevNext?: boolean;
  showFirstLast?: boolean;
}

/**
 * Pagination — Page navigation, styled by Figma tokens (theme).
 * Uses figma.fg, figma.fg_muted, figma.borderDefault, figma.bgSubtle; theme.radii.md.
 */
export function Pagination({
  page,
  totalPages,
  onPageChange,
  showPrevNext = true,
  showFirstLast = false,
}: PaginationProps) {
  const hasPrev = page > 1;
  const hasNext = page < totalPages;

  return (
    <HStack as="nav" role="navigation" aria-label="Pagination" spacing={2} flexWrap="wrap">
      {showFirstLast && (
        <Button
          size="sm"
          variant="outline"
          colorScheme="teal"
          onClick={() => onPageChange(1)}
          isDisabled={!hasPrev}
          aria-label="First page"
        >
          First
        </Button>
      )}
      {showPrevNext && (
        <Button
          size="sm"
          variant="outline"
          colorScheme="teal"
          onClick={() => onPageChange(page - 1)}
          isDisabled={!hasPrev}
          aria-label="Previous page"
        >
          Prev
        </Button>
      )}
      <Text fontSize="sm" color="figma.fg_muted" px={2}>
        Page {page} of {totalPages}
      </Text>
      {showPrevNext && (
        <Button
          size="sm"
          variant="outline"
          colorScheme="teal"
          onClick={() => onPageChange(page + 1)}
          isDisabled={!hasNext}
          aria-label="Next page"
        >
          Next
        </Button>
      )}
      {showFirstLast && (
        <Button
          size="sm"
          variant="outline"
          colorScheme="teal"
          onClick={() => onPageChange(totalPages)}
          isDisabled={!hasNext}
          aria-label="Last page"
        >
          Last
        </Button>
      )}
    </HStack>
  );
}
