import React, { useState, useEffect } from "react";
import {
  Box,
  VStack,
  Link,
  Heading,
  IconButton,
  useDisclosure,
  useColorMode,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerCloseButton,
} from "@chakra-ui/react";

const MenuIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
    <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
  </svg>
);

const SunIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
    <circle cx="9" cy="9" r="4" />
    <path d="M9 1v2M9 15v2M3.22 3.22l1.42 1.42M13.36 13.36l1.42 1.42M1 9h2M15 9h2M3.22 14.78l1.42-1.42M13.36 4.64l1.42-1.42" />
  </svg>
);

const MoonIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
    <path d="M8 1a7 7 0 107 7c-3.87 0-7-3.13-7-7s3.13-7 7-7z" />
  </svg>
);

const PAGES = [
  { id: "overview", label: "Overview" },
  { id: "accessibility", label: "Accessibility" },
  { id: "accordion", label: "Accordion" },
  { id: "action-bar", label: "Action bar" },
  { id: "alert", label: "Alert" },
  { id: "avatar", label: "Avatar" },
  { id: "badge", label: "Badge" },
  { id: "box", label: "Box" },
  { id: "breakpoints", label: "Breakpoints" },
  { id: "breadcrumb", label: "Breadcrumb" },
  { id: "button", label: "Button" },
  { id: "card", label: "Card" },
  { id: "checkbox", label: "Checkbox" },
  { id: "checkbox-card", label: "Checkbox card" },
  { id: "colors", label: "Colors" },
  { id: "combobox", label: "Combobox" },
  { id: "container", label: "Container" },
  { id: "dialog", label: "Dialog" },
  { id: "divider", label: "Divider" },
  { id: "flex", label: "Flex" },
  { id: "grid", label: "Grid" },
  { id: "heading", label: "Heading" },
  { id: "input", label: "Input" },
  { id: "link", label: "Link" },
  { id: "menu", label: "Menu" },
  { id: "pagination", label: "Pagination" },
  { id: "radii", label: "Radii" },
  { id: "radio", label: "Radio" },
  { id: "slider", label: "Slider" },
  { id: "spacing", label: "Spacing" },
  { id: "spinner", label: "Spinner" },
  { id: "stack", label: "Stack" },
  { id: "text", label: "Text" },
  { id: "textarea", label: "Textarea" },
  { id: "tooltip", label: "Tooltip" },
  { id: "tabs", label: "Tabs" },
  { id: "switch", label: "Switch" },
  { id: "select", label: "Select" },
  { id: "progress", label: "Progress" },
  { id: "skeleton", label: "Skeleton" },
  { id: "table", label: "Table" },
  { id: "kbd", label: "Kbd" },
  { id: "code", label: "Code" },
  { id: "close-button", label: "Close button" },
  { id: "tag", label: "Tag" },
  { id: "number-input", label: "Number input" },
  { id: "stat", label: "Stat" },
  { id: "image", label: "Image" },
  { id: "aspect-ratio", label: "Aspect ratio" },
  { id: "drawer", label: "Drawer" },
] as const;

export type PageId = (typeof PAGES)[number]["id"];

interface DocLayoutProps {
  renderPage: (pageId: PageId) => React.ReactNode;
}

function NavLinks({
  pageId,
  onSelectPage,
  onAfterSelect,
}: {
  pageId: PageId;
  onSelectPage: (id: PageId) => void;
  onAfterSelect?: () => void;
}) {
  return (
    <VStack align="stretch" spacing={0} gap={0}>
      {PAGES.map(({ id, label }) => (
        <Link
          key={id}
          href={`#${id}`}
          px={3}
          py={2}
          borderRadius="md"
          fontSize="sm"
          fontWeight={pageId === id ? "600" : "400"}
          color={pageId === id ? "teal.600" : "figma.fg"}
          bg={pageId === id ? "teal.50" : "transparent"}
          _hover={{ bg: "figma.muted", color: "teal.600" }}
          onClick={() => {
            onSelectPage(id);
            onAfterSelect?.();
          }}
        >
          {label}
        </Link>
      ))}
    </VStack>
  );
}

export function DocLayout({ renderPage }: DocLayoutProps) {
  const [pageId, setPageId] = useState<PageId>(() => {
    const hash = window.location.hash.slice(1) || "overview";
    return PAGES.some((p) => p.id === hash) ? (hash as PageId) : "overview";
  });
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { colorMode, toggleColorMode } = useColorMode();

  useEffect(() => {
    const sync = () => {
      const hash = window.location.hash.slice(1) || "overview";
      if (PAGES.some((p) => p.id === hash)) setPageId(hash as PageId);
    };
    sync();
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, []);

  return (
    <Box display="flex" flexDirection="column" minH="100vh" bg="figma.muted">
      {/* Mobile: header with menu button */}
      <Box
        display={{ base: "flex", md: "none" }}
        alignItems="center"
        justifyContent="space-between"
        px={4}
        py={3}
        bg="figma.default"
        borderBottomWidth="1px"
        borderColor="figma.borderDefault"
        position="sticky"
        top={0}
        zIndex={10}
      >
        <Heading size="sm" color="figma.fg">
          Design System
        </Heading>
        <Box display="flex" gap={1}>
          <IconButton
            aria-label={colorMode === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            icon={colorMode === "dark" ? <SunIcon /> : <MoonIcon />}
            variant="ghost"
            size="sm"
            onClick={toggleColorMode}
          />
          <IconButton
            aria-label="Open navigation menu"
            icon={<MenuIcon />}
            variant="ghost"
            size="md"
            onClick={onOpen}
          />
        </Box>
      </Box>

      {/* Mobile: drawer with nav */}
      <Drawer placement="left" onClose={onClose} isOpen={isOpen} size="xs">
        <DrawerOverlay />
        <DrawerContent bg="figma.default">
          <DrawerCloseButton aria-label="Close menu" color="figma.fg" />
          <DrawerHeader borderBottomWidth="1px" borderColor="figma.borderDefault" color="figma.fg">
            Design System
          </DrawerHeader>
          <DrawerBody py={4} px={0} overflowY="auto">
            <NavLinks pageId={pageId} onSelectPage={setPageId} onAfterSelect={onClose} />
          </DrawerBody>
        </DrawerContent>
      </Drawer>

      <Box display="flex" flex={1} minH={0}>
        {/* Desktop: sidebar */}
        <Box
          as="nav"
          display={{ base: "none", md: "block" }}
          w="240px"
          flexShrink={0}
          borderRightWidth="1px"
          borderColor="figma.borderDefault"
          bg="figma.default"
          py={6}
          px={4}
          position="sticky"
          top={0}
          h="100vh"
          overflowY="auto"
        >
          <Box display="flex" alignItems="center" justifyContent="space-between" mb={4} px={2}>
            <Heading size="sm" color="figma.fg">
              Design System
            </Heading>
            <IconButton
              aria-label={colorMode === "dark" ? "Switch to light mode" : "Switch to dark mode"}
              icon={colorMode === "dark" ? <SunIcon /> : <MoonIcon />}
              variant="ghost"
              size="sm"
              onClick={toggleColorMode}
            />
          </Box>
          <NavLinks pageId={pageId} onSelectPage={setPageId} />
        </Box>

        {/* Main content */}
        <Box
          flex={1}
          py={{ base: 4, md: 8 }}
          px={{ base: 4, md: 10 }}
          overflowY="auto"
          minW={0}
        >
          {renderPage(pageId)}
        </Box>
      </Box>
    </Box>
  );
}

export { PAGES };
