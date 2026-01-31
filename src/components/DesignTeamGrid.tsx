import { useState } from "react";
import {
  SimpleGrid,
  Box,
  Heading,
  Button,
  Flex,
  Link,
  HStack,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
} from "@chakra-ui/react";
import Card from "./card";
import { designTeam } from "../data/team";

const INITIAL_COUNT = 6;
const LOAD_MORE_COUNT = 6;

const cardMinW = "280px";
const gridColumns = { base: 1, sm: 2, lg: 3 };

const ArrowRightIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
  </svg>
);

const ArrowLeftIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
  </svg>
);

const EnvelopeIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m22 6-10 7L2 6" />
  </svg>
);

export default function DesignTeamGrid() {
  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT);
  const visibleMembers = designTeam.slice(0, visibleCount);
  const hasMore = visibleCount < designTeam.length;
  const isExpanded = visibleCount > INITIAL_COUNT;

  const loadMore = () => {
    setVisibleCount((prev) => Math.min(prev + LOAD_MORE_COUNT, designTeam.length));
  };

  const loadLess = () => {
    setVisibleCount(INITIAL_COUNT);
  };

  return (
    <Box>
      <Heading as="h1" size="lg" mb={2}>
        Design Team
      </Heading>
      <Breadcrumb mb={6} fontSize="sm" color="gray.600">
        <BreadcrumbItem>
          <BreadcrumbLink href="#">Frontpage</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="#">Personnel</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="#" isCurrentPage>
            Design Team
          </BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>

      <SimpleGrid columns={gridColumns} spacing={4} minChildWidth={cardMinW}>
        {visibleMembers.map((member) => (
          <Card
            key={member.id}
            avatarSrc={member.avatarSrc}
            avatarName={member.name}
            title={member.role}
            description={member.bio}
          />
        ))}
      </SimpleGrid>

      <Flex mt={6} gap={3} flexWrap="wrap" justify="flex-start">
        {hasMore && (
          <Button
            rightIcon={<ArrowRightIcon />}
            iconSpacing={2}
            bg="teal.500"
            color="white"
            _hover={{ bg: "teal.600" }}
            size="md"
            borderRadius="md"
            onClick={loadMore}
          >
            Show More
          </Button>
        )}
        {isExpanded && (
          <Button
            leftIcon={<ArrowLeftIcon />}
            iconSpacing={2}
            variant="outline"
            colorScheme="teal"
            size="md"
            borderRadius="md"
            onClick={loadLess}
          >
            Show Less
          </Button>
        )}
      </Flex>

      <Box mt={12}>
        <Heading as="h2" size="md" fontWeight="bold" mb={4}>
          Contact Us
        </Heading>
        <HStack spacing={6} flexWrap="wrap" as="nav">
          {["Management", "Production", "Design", "Development", "Assistance"].map(
            (label) => (
              <Link
                key={label}
                href="#"
                color="gray.600"
                fontSize="sm"
                textDecoration="underline"
                _hover={{ color: "gray.800" }}
                display="inline-flex"
                alignItems="center"
                gap={2}
              >
                <EnvelopeIcon />
                {label}
              </Link>
            )
          )}
        </HStack>
      </Box>
    </Box>
  );
}
