import {
  Accordion,
  ActionBar,
  Button,
  Card,
  Checkbox,
  CheckboxCard,
  Combobox,
  Dialog,
  Menu,
  MenuItem,
  Pagination,
  Radio,
  Slider,
  Input,
  Link,
  Badge,
  Text,
  Heading,
  Avatar,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  Divider,
  Spinner,
  Container,
  VStack,
  HStack,
  Box,
  Flex,
  SimpleGrid,
} from "../design-system";
import { useState } from "react";
import { IconButton, useDisclosure, RadioGroup } from "@chakra-ui/react";
import { figmaVariableDefs } from "../theme/figma-tokens";
import { PageWrapper, Section, CodeBlock } from "./PageWrapper";
import type { PageId } from "./DocLayout";

const HEX = /^#([0-9A-Fa-f]{3}){1,2}$|^#([0-9A-Fa-f]{4}){1,2}$/;
function isColorVal(v: string | number): v is string {
  return typeof v === "string" && HEX.test(v);
}

/** Group Figma variable defs into semantic, gray, and palette color sections. */
function getFigmaColorGroups(): {
  semantic: Array<{ key: string; value: string }>;
  gray: Array<{ key: string; value: string; shade: string }>;
  palettes: Record<string, Array<{ key: string; value: string; shade: string }>>;
} {
  const semantic: Array<{ key: string; value: string }> = [];
  const gray: Array<{ key: string; value: string; shade: string }> = [];
  const palettes: Record<string, Array<{ key: string; value: string; shade: string }>> = {};
  const paletteNames = [
    "red", "pink", "purple", "cyan", "blue", "teal", "green", "yellow", "orange",
    "primary", "secondary", "success", "error", "warning",
  ];

  for (const [key, value] of Object.entries(figmaVariableDefs)) {
    if (!isColorVal(value)) continue;
    const parts = key.split("/");
    const first = parts[0]?.toLowerCase() ?? "";
    const second = parts[1] ?? "";

    if (first === "text" || first === "bg" || first === "border" || (first === "red" && second === "subtle") || (first === "blue" && second === "muted")) {
      semantic.push({ key, value });
    } else if (first === "gray") {
      gray.push({ key, value, shade: second });
    } else if (paletteNames.includes(first)) {
      if (!palettes[first]) palettes[first] = [];
      palettes[first].push({ key, value, shade: second });
    }
  }

  gray.sort((a, b) => Number(a.shade) - Number(b.shade) || (a.shade < b.shade ? -1 : 1));
  for (const name of paletteNames) {
    if (palettes[name]) palettes[name].sort((a, b) => Number(a.shade) - Number(b.shade) || (a.shade < b.shade ? -1 : 1));
  }
  return { semantic, gray, palettes };
}

function toNumber(v: string | number): number | null {
  if (typeof v === "number" && !Number.isNaN(v)) return v;
  if (typeof v === "string") {
    const n = Number(v);
    return Number.isNaN(n) ? null : n;
  }
  return null;
}

/** Radii tokens from Figma (Radii/*). Theme key = last path segment. */
function getFigmaRadiiTokens(): Array<{ key: string; token: string; value: string }> {
  const out: Array<{ key: string; token: string; value: string }> = [];
  for (const [key, value] of Object.entries(figmaVariableDefs)) {
    const norm = key.replace(/\s+/g, "").toLowerCase();
    if (!norm.startsWith("radii/")) continue;
    const num = toNumber(value);
    if (num === null || num < 0) continue;
    const path = key.split("/").filter(Boolean);
    const token = path[path.length - 1] ?? key;
    const valueStr = num >= 9999 ? "9999px" : `${num}px`;
    out.push({ key, token, value: valueStr });
  }
  out.sort((a, b) => {
    const na = toNumber(a.value.replace("px", ""));
    const nb = toNumber(b.value.replace("px", ""));
    if (na !== null && nb !== null) return na - nb;
    return a.token.localeCompare(b.token);
  });
  return out;
}

/** Spacing/size tokens from Figma (Size/*, Spacing/*, Large Sizes/*). */
function getFigmaSpacingGroups(): {
  size: Array<{ key: string; token: string; value: string }>;
  spacing: Array<{ key: string; token: string; value: string }>;
  largeSizes: Array<{ key: string; token: string; value: string }>;
} {
  const size: Array<{ key: string; token: string; value: string }> = [];
  const spacing: Array<{ key: string; token: string; value: string }> = [];
  const largeSizes: Array<{ key: string; token: string; value: string }> = [];
  for (const [key, value] of Object.entries(figmaVariableDefs)) {
    const num = toNumber(value);
    if (num === null || num < 0) continue;
    const norm = key.replace(/\s+/g, "").toLowerCase();
    const path = key.split("/").filter(Boolean);
    const token = path[path.length - 1] ?? path[1] ?? key;
    const valueStr = `${num}px`;
    if (norm.startsWith("size/") && !norm.startsWith("large")) {
      size.push({ key, token, value: valueStr });
    } else if (norm.startsWith("spacing/")) {
      spacing.push({ key, token, value: valueStr });
    } else if (norm.startsWith("largesizes/")) {
      largeSizes.push({ key, token, value: valueStr });
    }
  }
  const sortByNum = (a: { token: string; value: string }, b: { token: string; value: string }) => {
    const na = toNumber(a.value.replace("px", ""));
    const nb = toNumber(b.value.replace("px", ""));
    if (na !== null && nb !== null) return na - nb;
    return a.token.localeCompare(b.token);
  };
  size.sort(sortByNum);
  spacing.sort(sortByNum);
  largeSizes.sort(sortByNum);
  return { size, spacing, largeSizes };
}

/** Breakpoint tokens from Figma (Breakpoint/*). Theme key = path[1]. */
function getFigmaBreakpointTokens(): Array<{ key: string; token: string; value: string }> {
  const out: Array<{ key: string; token: string; value: string }> = [];
  for (const [key, value] of Object.entries(figmaVariableDefs)) {
    const norm = key.replace(/\s+/g, "").toLowerCase();
    if (!norm.startsWith("breakpoint/") && !norm.startsWith("breakpoints/")) continue;
    const num = toNumber(value);
    if (num === null || num < 0) continue;
    const path = key.split("/").filter(Boolean);
    const token = path[path.length - 1] ?? path[1] ?? key;
    out.push({ key, token, value: `${num}px` });
  }
  const order = ["sm", "md", "lg", "xl", "2xl", "base"];
  out.sort((a, b) => {
    const ia = order.indexOf(a.token);
    const ib = order.indexOf(b.token);
    if (ia !== -1 && ib !== -1) return ia - ib;
    if (ia !== -1) return -1;
    if (ib !== -1) return 1;
    return a.token.localeCompare(b.token);
  });
  return out;
}

export function ComponentPages({ pageId }: { pageId: PageId }) {
  switch (pageId) {
    case "overview":
      return (
        <PageWrapper
          title="Overview"
          description="Design system built on Chakra UI MCP components and Figma MCP tokens. Use the sidebar to browse each component."
        >
          <Section title="Getting started">
            <Text mb={4} color="figma.fg_muted">
              All primitives and layout components are in <code>src/design-system</code>. The theme
              merges Figma variable definitions from <code>src/theme/figma-tokens.ts</code>.
            </Text>
            <HStack spacing={4} flexWrap="wrap">
              <Button colorScheme="teal" label="Primary" />
              <Button colorScheme="teal" variant="outline" label="Outline" />
              <Badge colorScheme="teal">Badge</Badge>
            </HStack>
          </Section>
          <Section title="Accessibility (WCAG 2.1 AA)">
            <Text fontSize="sm" color="figma.fg_muted" mb={2}>
              Use the design system components with visible labels and semantic structure. See the{" "}
              <Link href="#accessibility" color="teal.600">Accessibility</Link> page for full
              guidance and the checklist.
            </Text>
          </Section>
          <Section title="Code example">
            <CodeBlock
              code={`import { Button, Badge } from "../design-system";

<Button colorScheme="teal" label="Primary" />
<Badge colorScheme="teal">Badge</Badge>`}
            />
          </Section>
        </PageWrapper>
      );

    case "accessibility":
      return (
        <PageWrapper
          title="Accessibility"
          description="Guidance for meeting WCAG 2.1 Level AA. Use these practices with design system components."
        >
          <Section title="Overview">
            <Text mb={4}>
              This design system is built to support <strong>WCAG 2.1 Level AA</strong>. Chakra UI
              provides keyboard support, focus management, and ARIA where needed. Apply the guidance
              below so your implementation stays accessible.
            </Text>
          </Section>

          <Section title="1. Perceivable">
            <VStack align="stretch" spacing={3}>
              <Box>
                <Heading size="xs" mb={1} color="figma.fg">
                  1.1.1 Non-text Content (Level A)
                </Heading>
                <Text fontSize="sm" color="figma.fg_muted">
                  Provide text alternatives for images and icons. Use <code>Avatar name</code> for
                  fallback initials; use <code>alt</code> for images. Decorative images: use{" "}
                  <code>alt=""</code> or <code>role="presentation"</code>.
                </Text>
              </Box>
              <Box>
                <Heading size="xs" mb={1} color="figma.fg">
                  1.3.1 Info and Relationships (Level A)
                </Heading>
                <Text fontSize="sm" color="figma.fg_muted">
                  Use semantic structure: <code>Heading</code> for titles, <code>Input</code> with{" "}
                  <code>label</code>, <code>FormControl</code> for label–input association. Use lists
                  for lists and <code>Breadcrumb</code> for navigation trails.
                </Text>
              </Box>
              <Box>
                <Heading size="xs" mb={1} color="figma.fg">
                  1.4.3 Contrast (Minimum) (Level AA)
                </Heading>
                <Text fontSize="sm" color="figma.fg_muted">
                  <strong>Normal text:</strong> at least 4.5:1 against background.{" "}
                  <strong>Large text</strong> (18px+ or 14px+ bold): at least 3:1. Use{" "}
                  <code>figma.fg</code> on <code>figma.default</code> for body; ensure custom
                  combinations (e.g. teal.600 on white) meet contrast. Test with a contrast checker.
                </Text>
              </Box>
              <Box>
                <Heading size="xs" mb={1} color="figma.fg">
                  1.4.11 Non-text Contrast (Level AA)
                </Heading>
                <Text fontSize="sm" color="figma.fg_muted">
                  UI components and graphics need at least 3:1 against adjacent colors. Buttons,
                  inputs, and focus indicators should be clearly visible.
                </Text>
              </Box>
            </VStack>
          </Section>

          <Section title="2. Operable">
            <VStack align="stretch" spacing={3}>
              <Box>
                <Heading size="xs" mb={1} color="figma.fg">
                  2.1.1 Keyboard (Level A)
                </Heading>
                <Text fontSize="sm" color="figma.fg_muted">
                  All functionality must be available via keyboard. Buttons, links, and inputs are
                  focusable and activatable with Enter/Space. Don’t remove focusability; add{" "}
                  <code>tabIndex={0}</code> only when building custom interactive elements.
                </Text>
              </Box>
              <Box>
                <Heading size="xs" mb={1} color="figma.fg">
                  2.4.7 Focus Visible (Level AA)
                </Heading>
                <Text fontSize="sm" color="figma.fg_muted">
                  Ensure a visible focus indicator. Chakra provides focus rings; avoid{" "}
                  <code>outline: none</code> without a replacement (e.g. <code>_focus</code> with
                  border or box-shadow). Don’t reduce focus visibility for aesthetics alone.
                </Text>
              </Box>
              <Box>
                <Heading size="xs" mb={1} color="figma.fg">
                  2.4.3 Focus Order (Level A)
                </Heading>
                <Text fontSize="sm" color="figma.fg_muted">
                  Focus order should follow reading order. Use logical DOM order; avoid positive{" "}
                  <code>tabIndex</code>.
                </Text>
              </Box>
              <Box>
                <Heading size="xs" mb={1} color="figma.fg">
                  2.5.3 Label in Name (Level A)
                </Heading>
                <Text fontSize="sm" color="figma.fg_muted">
                  The accessible name should include the visible label. Use <code>label</code> prop
                  on Button so screen readers announce it; use visible label text that matches.
                </Text>
              </Box>
            </VStack>
          </Section>

          <Section title="3. Understandable">
            <VStack align="stretch" spacing={3}>
              <Box>
                <Heading size="xs" mb={1} color="figma.fg">
                  3.3.1 Error Identification (Level A)
                </Heading>
                <Text fontSize="sm" color="figma.fg_muted">
                  Describe errors in text. Use Input’s <code>error</code> prop and associate it with
                  the field (Chakra FormControl does this). Use <code>aria-invalid</code> when
                  invalid.
                </Text>
              </Box>
              <Box>
                <Heading size="xs" mb={1} color="figma.fg">
                  3.3.2 Labels or Instructions (Level A)
                </Heading>
                <Text fontSize="sm" color="figma.fg_muted">
                  Provide labels for all inputs. Use the Input component’s <code>label</code> prop;
                  for custom fields, use <code>FormLabel</code> and link via <code>id</code> /{" "}
                  <code>htmlFor</code>.
                </Text>
              </Box>
              <Box>
                <Heading size="xs" mb={1} color="figma.fg">
                  3.3.3 Error Suggestion (Level AA)
                </Heading>
                <Text fontSize="sm" color="figma.fg_muted">
                  Where possible, suggest corrections (e.g. “Enter a valid email address”) in the
                  error message.
                </Text>
              </Box>
            </VStack>
          </Section>

          <Section title="4. Robust">
            <VStack align="stretch" spacing={3}>
              <Box>
                <Heading size="xs" mb={1} color="figma.fg">
                  4.1.2 Name, Role, Value (Level A)
                </Heading>
                <Text fontSize="sm" color="figma.fg_muted">
                  Use native elements (button, a, input) so name, role, and value are exposed. For
                  custom widgets, use ARIA (role, aria-label, aria-expanded, etc.) and keep state in
                  sync.
                </Text>
              </Box>
              <Box>
                <Heading size="xs" mb={1} color="figma.fg">
                  4.1.3 Status Messages (Level AA)
                </Heading>
                <Text fontSize="sm" color="figma.fg_muted">
                  For dynamic content (success, errors, loading), use live regions. Chakra Alert and
                  AlertDescription can be wrapped in <code>role="alert"</code> or{" "}
                  <code>aria-live="polite"</code> so assistive tech announces updates.
                </Text>
              </Box>
            </VStack>
          </Section>

          <Section title="Quick checklist">
            <Box
              as="ul"
              fontSize="sm"
              color="figma.fg_muted"
              pl={6}
              sx={{ "& li": { mb: 2 } }}
            >
              <li>Always provide a visible label for buttons and inputs.</li>
              <li>Ensure text contrast ≥ 4.5:1 (normal) or ≥ 3:1 (large).</li>
              <li>Don’t remove or hide focus indicators.</li>
              <li>Associate error messages with the relevant field.</li>
              <li>Use semantic headings (Heading) and landmarks where appropriate.</li>
              <li>Give links descriptive text (avoid “click here”).</li>
              <li>Provide text alternatives for images and icons that convey information.</li>
            </Box>
          </Section>

          <Section title="Code example">
            <CodeBlock
              code={`// Accessible form: label + error linked to input
<Input label="Email" error="Enter a valid email" />

// Accessible button: visible label
<Button label="Submit" />

// Alert as status message (use role="alert" for critical)
<Alert status="error" role="alert">
  <AlertTitle>Error</AlertTitle>
  <AlertDescription>Please fix the errors below.</AlertDescription>
</Alert>`}
            />
          </Section>
        </PageWrapper>
      );

    case "colors": {
      const { semantic, gray, palettes } = getFigmaColorGroups();
      const paletteOrder = [
        "red", "pink", "purple", "cyan", "blue", "teal", "green", "yellow", "orange",
        "primary", "secondary", "success", "error", "warning",
      ];
      return (
        <PageWrapper
          title="Colors"
          description="Figma color variables from get_variable_defs. Theme keys: figma.*, gray.*, teal.*, etc."
        >
          <Section title="Semantic (figma)">
            <Flex gap={3} flexWrap="wrap" align="center">
              {semantic.map(({ key, value }) => (
                <Box key={key}>
                  <Box
                    w="80px"
                    h="48px"
                    borderRadius="md"
                    bg={value}
                    borderWidth="1px"
                    borderColor="figma.borderDefault"
                    mb={1}
                  />
                  <Text fontSize="xs" fontFamily="mono" color="figma.fg_muted" noOfLines={1} title={value}>
                    {key}
                  </Text>
                  <Text fontSize="xs" color="figma.fg_subtle" title={value}>
                    {value}
                  </Text>
                </Box>
              ))}
            </Flex>
          </Section>
          <Section title="Gray">
            <Flex gap={1} flexWrap="wrap" align="flex-end">
              {gray.map(({ key, value, shade }) => (
                <Box key={key} textAlign="center">
                  <Box
                    w="56px"
                    h="56px"
                    borderRadius="md"
                    bg={value}
                    borderWidth="1px"
                    borderColor={Number(shade) > 400 ? "transparent" : "figma.borderDefault"}
                    mb={1}
                  />
                  <Text fontSize="xs" fontFamily="mono" color="figma.fg_muted">
                    {shade}
                  </Text>
                  <Text fontSize="xs" color="figma.fg_subtle" noOfLines={1} title={value}>
                    {value}
                  </Text>
                </Box>
              ))}
            </Flex>
          </Section>
          {paletteOrder.map(
            (name) =>
              palettes[name]?.length && (
                <Section key={name} title={name.charAt(0).toUpperCase() + name.slice(1)}>
                  <Flex gap={1} flexWrap="wrap" align="flex-end">
                    {palettes[name].map(({ key, value, shade }) => (
                      <Box key={key} textAlign="center">
                        <Box
                          w="56px"
                          h="56px"
                          borderRadius="md"
                          bg={value}
                          borderWidth="1px"
                          borderColor={Number(shade) > 400 ? "transparent" : "figma.borderDefault"}
                          mb={1}
                        />
                        <Text fontSize="xs" fontFamily="mono" color="figma.fg_muted">
                          {shade}
                        </Text>
                        <Text fontSize="xs" color="figma.fg_subtle" noOfLines={1} title={value}>
                          {value}
                        </Text>
                      </Box>
                    ))}
                  </Flex>
                </Section>
              )
          )}
          <Section title="Accessibility (WCAG 2.1 AA)">
            <Text fontSize="sm" color="figma.fg_muted" mb={2}>
              Ensure text has at least 4.5:1 contrast (3:1 for large text) against the background
              (1.4.3). Use <code>figma.fg</code> on <code>figma.default</code> for body; test custom
              pairs with a contrast checker.
            </Text>
          </Section>
          <Section title="Code example">
            <CodeBlock
              code={`// Colors come from figma-tokens.ts (get_variable_defs).
// Use theme keys: figma.fg, gray.500, teal.600, blue.500, etc.

<Box bg="figma.default" color="figma.fg" />
<Box bg="teal.500" color="white" />`}
            />
          </Section>
        </PageWrapper>
      );
    }

    case "radii": {
      const radiiTokens = getFigmaRadiiTokens();
      return (
        <PageWrapper
          title="Radii"
          description={'Figma radius variables from get_variable_defs. Use theme.radii (e.g. borderRadius="md").'}
        >
          <Section title="All radii">
            <Flex gap={4} flexWrap="wrap" align="flex-end">
              {radiiTokens.map(({ key, token, value }) => (
                <Box key={key} textAlign="center">
                  <Box
                    w="64px"
                    h="64px"
                    bg="figma.bgSubtle"
                    borderWidth="1px"
                    borderColor="figma.borderDefault"
                    borderRadius={token === "full" ? "full" : token}
                    mb={2}
                  />
                  <Text fontSize="xs" fontFamily="mono" color="figma.fg" fontWeight="600">
                    {token}
                  </Text>
                  <Text fontSize="xs" color="figma.fg_subtle">
                    {key}
                  </Text>
                  <Text fontSize="xs" color="figma.fg_muted">
                    {value}
                  </Text>
                </Box>
              ))}
            </Flex>
          </Section>
          <Section title="Accessibility (WCAG 2.1 AA)">
            <Text fontSize="sm" color="figma.fg_muted" mb={2}>
              Radii are presentational; ensure focus indicators and interactive boundaries remain
              visible (1.4.11). Use consistent radii for similar components.
            </Text>
          </Section>
          <Section title="Code example">
            <CodeBlock
              code={`// theme.radii from figma-tokens.ts (Radii/*)
<Box borderRadius="md" />
<Button borderRadius="lg" />
<Card borderRadius="xl" />`}
            />
          </Section>
        </PageWrapper>
      );
    }

    case "spacing": {
      const { size, spacing, largeSizes } = getFigmaSpacingGroups();
      return (
        <PageWrapper
          title="Spacing"
          description={'Figma size and spacing variables from get_variable_defs. Use theme.space (e.g. gap={4}, p={3}).'}
        >
          <Section title="Size">
            <Flex gap={3} flexWrap="wrap" align="center">
              {size.map(({ key, token, value }) => (
                <Box
                  key={key}
                  px={3}
                  py={2}
                  bg="figma.bgSubtle"
                  borderRadius="md"
                  borderWidth="1px"
                  borderColor="figma.borderDefault"
                >
                  <Text fontSize="xs" fontFamily="mono" fontWeight="600" color="figma.fg">
                    {token}
                  </Text>
                  <Text fontSize="xs" color="figma.fg_muted">
                    {value}
                  </Text>
                  <Text fontSize="xs" color="figma.fg_subtle" noOfLines={1} title={key}>
                    {key}
                  </Text>
                </Box>
              ))}
            </Flex>
          </Section>
          <Section title="Spacing">
            <Flex gap={3} flexWrap="wrap" align="center">
              {spacing.map(({ key, token, value }) => (
                <Box
                  key={key}
                  px={3}
                  py={2}
                  bg="figma.bgSubtle"
                  borderRadius="md"
                  borderWidth="1px"
                  borderColor="figma.borderDefault"
                >
                  <Text fontSize="xs" fontFamily="mono" fontWeight="600" color="figma.fg">
                    {token}
                  </Text>
                  <Text fontSize="xs" color="figma.fg_muted">
                    {value}
                  </Text>
                  <Text fontSize="xs" color="figma.fg_subtle" noOfLines={1} title={key}>
                    {key}
                  </Text>
                </Box>
              ))}
            </Flex>
          </Section>
          <Section title="Large Sizes">
            <Flex gap={3} flexWrap="wrap" align="center">
              {largeSizes.map(({ key, token, value }) => (
                <Box
                  key={key}
                  px={3}
                  py={2}
                  bg="figma.bgSubtle"
                  borderRadius="md"
                  borderWidth="1px"
                  borderColor="figma.borderDefault"
                >
                  <Text fontSize="xs" fontFamily="mono" fontWeight="600" color="figma.fg">
                    {token}
                  </Text>
                  <Text fontSize="xs" color="figma.fg_muted">
                    {value}
                  </Text>
                  <Text fontSize="xs" color="figma.fg_subtle" noOfLines={1} title={key}>
                    {key}
                  </Text>
                </Box>
              ))}
            </Flex>
          </Section>
          <Section title="Accessibility (WCAG 2.1 AA)">
            <Text fontSize="sm" color="figma.fg_muted" mb={2}>
              Spacing affects layout and focus order; keep touch targets at least 44×44px where
              possible (2.5.5). Use consistent spacing for related content (1.3.1).
            </Text>
          </Section>
          <Section title="Code example">
            <CodeBlock
              code={`// theme.space from figma-tokens.ts (Size/*, Spacing/*)
<Flex gap={4} />
<Box p={3} px={4} />
<VStack spacing={2} />`}
            />
          </Section>
        </PageWrapper>
      );
    }

    case "breakpoints": {
      const breakpointTokens = getFigmaBreakpointTokens();
      return (
        <PageWrapper
          title="Breakpoints"
          description={'Figma breakpoint variables from get_variable_defs. Use theme.breakpoints (e.g. display={{ base: "none", md: "block" }}).'}
        >
          <Section title="Breakpoints">
            <Flex gap={3} flexWrap="wrap" align="center">
              {breakpointTokens.map(({ key, token, value }) => (
                <Box
                  key={key}
                  px={4}
                  py={3}
                  bg="figma.bgSubtle"
                  borderRadius="md"
                  borderWidth="1px"
                  borderColor="figma.borderDefault"
                >
                  <Text fontSize="sm" fontFamily="mono" fontWeight="700" color="figma.fg">
                    {token}
                  </Text>
                  <Text fontSize="sm" color="figma.fg_muted" mt={1}>
                    {value}
                  </Text>
                  <Text fontSize="xs" color="figma.fg_subtle" noOfLines={1} title={key} mt={1}>
                    {key}
                  </Text>
                </Box>
              ))}
            </Flex>
            {breakpointTokens.length === 0 && (
              <Text fontSize="sm" color="figma.fg_muted">
                No breakpoint variables in tokens. Add Breakpoint/sm, Breakpoint/md, etc. to
                figma-tokens.ts or run get_variable_defs on a Figma node with breakpoint variables.
              </Text>
            )}
          </Section>
          <Section title="Accessibility (WCAG 2.1 AA)">
            <Text fontSize="sm" color="figma.fg_muted" mb={2}>
              Use responsive props so content reflows on small screens; avoid horizontal scroll
              (1.4.10). Keep touch targets at least 44×44px on mobile (2.5.5).
            </Text>
          </Section>
          <Section title="Code example">
            <CodeBlock
              code={`// theme.breakpoints from figma-tokens.ts (Breakpoint/*)
<Box display={{ base: "none", md: "block" }} />
<SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} />
<Text fontSize={{ base: "sm", md: "md" }} />`}
            />
          </Section>
        </PageWrapper>
      );
    }

    case "button":
      return (
        <PageWrapper
          title="Button"
          description="Trigger actions. Chakra Button with Figma-backed theme."
        >
          <Section title="Variants">
            <Flex gap={4} flexWrap="wrap" direction="row" align="center">
              <Button colorScheme="teal" label="Solid" />
              <Button colorScheme="teal" variant="outline" label="Outline" />
              <Button colorScheme="teal" variant="ghost" label="Ghost" />
            </Flex>
          </Section>
          <Section title="Sizes">
            <Flex gap={4} flexWrap="wrap" direction="row" align="center">
              <Button size="sm" label="Small" />
              <Button size="md" label="Medium" />
              <Button size="lg" label="Large" />
            </Flex>
          </Section>
          <Section title="Color schemes">
            <Flex gap={4} flexWrap="wrap" direction="row" align="center">
              <Button colorScheme="teal" label="Teal" />
              <Button colorScheme="blue" label="Blue" />
              <Button colorScheme="gray" label="Gray" />
              <Button colorScheme="primary" label="Primary" />
              <Button colorScheme="secondary" label="Secondary" />
              <Button colorScheme="success" label="Success" />
              <Button colorScheme="error" label="Error" />
              <Button colorScheme="warning" label="Warning" />
            </Flex>
          </Section>
          <Section title="Icon button">
            <Flex gap={4} flexWrap="wrap" direction="row" align="center">
              <IconButton
                aria-label="Add"
                icon={
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
                    <path d="M9 3v12M3 9h12" />
                  </svg>
                }
                colorScheme="teal"
                size="sm"
              />
              <IconButton
                aria-label="Add"
                icon={
                  <svg width="20" height="20" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
                    <path d="M9 3v12M3 9h12" />
                  </svg>
                }
                colorScheme="teal"
                size="md"
              />
              <IconButton
                aria-label="Add"
                icon={
                  <svg width="22" height="22" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
                    <path d="M9 3v12M3 9h12" />
                  </svg>
                }
                colorScheme="teal"
                size="lg"
              />
              <IconButton
                aria-label="Add"
                icon={
                  <svg width="20" height="20" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
                    <path d="M9 3v12M3 9h12" />
                  </svg>
                }
                variant="outline"
                colorScheme="teal"
                size="md"
              />
              <IconButton
                aria-label="Add"
                icon={
                  <svg width="20" height="20" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
                    <path d="M9 3v12M3 9h12" />
                  </svg>
                }
                variant="ghost"
                colorScheme="teal"
                size="md"
              />
            </Flex>
            <Text fontSize="sm" color="figma.fg_muted" mt={2}>
              Icon-only buttons for actions (add, edit, etc.). Always use <code>aria-label</code> for
              accessibility (2.5.3).
            </Text>
          </Section>
          <Section title="Accessibility (WCAG 2.1 AA)">
            <Text fontSize="sm" color="figma.fg_muted" mb={2}>
              Use a visible <code>label</code> so the button has an accessible name (2.5.3). Don’t
              remove focus styles; Chakra provides visible focus (2.4.7). Buttons are keyboard
              activatable (2.1.1).
            </Text>
          </Section>
          <Section title="Code example">
            <CodeBlock
              code={`import { Button } from "../design-system";
import { IconButton } from "@chakra-ui/react";

<Button colorScheme="teal" label="Save" />
<Button variant="outline" colorScheme="teal" label="Cancel" />

<IconButton aria-label="Add" icon={<AddIcon />} colorScheme="teal" size="md" />`}
            />
          </Section>
        </PageWrapper>
      );

    case "card":
      return (
        <PageWrapper
          title="Card"
          description="Container for content with optional avatar, title, and description."
        >
          <Section title="Basic">
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4} minChildWidth="280px">
              <Card title="Card title" description="Card body text. Styled by Figma tokens." />
              <Card
                avatarSrc="https://i.pravatar.cc/128?u=1"
                avatarName="Jane Doe"
                title="Lead Designer"
                description="Design systems and product strategy."
              />
            </SimpleGrid>
          </Section>
          <Section title="With children">
            <Card title="Custom content">
              <Text fontSize="sm" color="figma.fg_muted" mt={2}>
                Any children can go here.
              </Text>
            </Card>
          </Section>
          <Section title="Accessibility (WCAG 2.1 AA)">
            <Text fontSize="sm" color="figma.fg_muted" mb={2}>
              Use clear <code>title</code> and <code>description</code> for structure. If the card
              is interactive, use a focusable element (e.g. link or button) with a visible focus
              indicator (2.4.7).
            </Text>
          </Section>
          <Section title="Code example">
            <CodeBlock
              code={`import { Card } from "../design-system";

<Card title="Card title" description="Card body text." />
<Card avatarSrc="..." avatarName="Jane" title="Lead" description="..." />`}
            />
          </Section>
        </PageWrapper>
      );

    case "checkbox":
      return (
        <PageWrapper title="Checkbox" description="Single or multiple selection. Uses figma.fg, figma.borderDefault; theme.radii.sm.">
          <Section title="Default">
            <VStack align="stretch" spacing={3}>
              <Checkbox>Option one</Checkbox>
              <Checkbox defaultChecked>Option two (checked)</Checkbox>
              <Checkbox isDisabled>Disabled</Checkbox>
            </VStack>
          </Section>
          <Section title="Code example">
            <CodeBlock
              code={`import { Checkbox } from "../design-system";

<Checkbox>Option one</Checkbox>
<Checkbox defaultChecked>Option two</Checkbox>`}
            />
          </Section>
        </PageWrapper>
      );

    case "checkbox-card":
      return (
        <PageWrapper title="Checkbox card" description="Card with checkbox. Uses figma.default, figma.borderDefault, figma.fg, figma.fg_muted.">
          <Section title="Default">
            <VStack align="stretch" spacing={3} maxW="400px">
              <CheckboxCard title="Basic plan" description="For individuals and small teams." />
              <CheckboxCard title="Pro plan" description="For growing teams. Includes analytics." defaultChecked />
            </VStack>
          </Section>
          <Section title="Code example">
            <CodeBlock
              code={`import { CheckboxCard } from "../design-system";

<CheckboxCard title="Plan" description="Description." />
<CheckboxCard title="Plan" defaultChecked />`}
            />
          </Section>
        </PageWrapper>
      );

    case "input":
      return (
        <PageWrapper
          title="Input"
          description="Text input with optional label and error message."
        >
          <Section title="Default">
            <Input label="Email" placeholder="you@example.com" maxW="sm" />
          </Section>
          <Section title="With error">
            <Input
              label="Username"
              placeholder="jane"
              error="Username is required"
              maxW="sm"
            />
          </Section>
          <Section title="Disabled">
            <Input label="Disabled" placeholder="Disabled" isDisabled maxW="sm" />
          </Section>
          <Section title="Accessibility (WCAG 2.1 AA)">
            <Text fontSize="sm" color="figma.fg_muted" mb={2}>
              Always use the <code>label</code> prop so the field has an associated label (3.3.2).
              Use <code>error</code> for invalid state so errors are identified and described
              (3.3.1); Chakra links label and error to the input. Prefer descriptive error messages
              (3.3.3).
            </Text>
          </Section>
          <Section title="Code example">
            <CodeBlock
              code={`import { Input } from "../design-system";

<Input label="Email" placeholder="you@example.com" />
<Input label="Username" error="Username is required" />`}
            />
          </Section>
        </PageWrapper>
      );

    case "link":
      return (
        <PageWrapper title="Link" description="Navigation and inline links.">
          <Section title="Default">
            <HStack spacing={4}>
              <Link href="#">Default link</Link>
              <Link href="#" color="figma.fg">Gray link</Link>
            </HStack>
          </Section>
          <Section title="In text">
            <Text>
              This is a paragraph with a <Link href="#">link inside</Link> the text.
            </Text>
          </Section>
          <Section title="Accessibility (WCAG 2.1 AA)">
            <Text fontSize="sm" color="figma.fg_muted" mb={2}>
              Use descriptive link text (avoid “click here”) so purpose is clear (2.4.4). Ensure
              link color meets contrast (1.4.3). Links are keyboard focusable and activatable
              (2.1.1, 2.4.7).
            </Text>
          </Section>
          <Section title="Code example">
            <CodeBlock
              code={`import { Link } from "../design-system";

<Link href="/docs">Default link</Link>
<Link href="#" color="figma.fg">Gray link</Link>`}
            />
          </Section>
        </PageWrapper>
      );

    case "menu":
      return (
        <PageWrapper title="Menu" description="Dropdown menu. Uses figma.default, figma.borderDefault, figma.fg, figma.bgSubtle.">
          <Section title="Default">
            <Menu>
              <Menu.Button>
                Actions <span aria-hidden>▼</span>
              </Menu.Button>
              <Menu.List>
                <MenuItem>Edit</MenuItem>
                <MenuItem>Duplicate</MenuItem>
                <Menu.Divider borderColor="figma.borderDefault" />
                <MenuItem color="figma.fg_error">Delete</MenuItem>
              </Menu.List>
            </Menu>
          </Section>
          <Section title="Code example">
            <CodeBlock
              code={`import { Menu, MenuButton, MenuList, MenuItem } from "../design-system";

<Menu>
  <Menu.Button>Actions</Menu.Button>
  <Menu.List>
    <MenuItem>Edit</MenuItem>
    <MenuItem>Delete</MenuItem>
  </Menu.List>
</Menu>`}
            />
          </Section>
        </PageWrapper>
      );

    case "pagination": {
      const PaginationDemo = () => {
        const [p, setP] = useState(1);
        return <Pagination page={p} totalPages={5} onPageChange={setP} showPrevNext showFirstLast />;
      };
      return (
        <PageWrapper title="Pagination" description="Page navigation. Uses figma.fg_muted; Button uses theme.">
          <Section title="Default">
            <PaginationDemo />
          </Section>
          <Section title="Code example">
            <CodeBlock
              code={`import { Pagination } from "../design-system";

<Pagination page={1} totalPages={5} onPageChange={setPage} />`}
            />
          </Section>
        </PageWrapper>
      );
    }

    case "radio":
      return (
        <PageWrapper title="Radio" description="Single selection. Uses figma.fg, figma.borderDefault; theme.radii.full.">
          <Section title="Default">
            <RadioGroup defaultValue="1">
              <VStack align="stretch" spacing={2}>
                <Radio value="1">Option one</Radio>
                <Radio value="2">Option two</Radio>
                <Radio value="3">Option three</Radio>
              </VStack>
            </RadioGroup>
          </Section>
          <Section title="Code example">
            <CodeBlock
              code={`import { Radio, RadioGroup } from "../design-system";

<RadioGroup defaultValue="1">
  <Radio value="1">Option one</Radio>
  <Radio value="2">Option two</Radio>
</RadioGroup>`}
            />
          </Section>
        </PageWrapper>
      );

    case "slider":
      return (
        <PageWrapper title="Slider" description="Range input. Uses figma.bgSubtle (track); teal.500 (filled, thumb).">
          <Section title="Default">
            <VStack align="stretch" spacing={6} maxW="320px">
              <Box>
                <Text fontSize="sm" color="figma.fg_muted" mb={2}>Default</Text>
                <Slider defaultValue={50} min={0} max={100} />
              </Box>
            </VStack>
          </Section>
          <Section title="Code example">
            <CodeBlock
              code={`import { Slider } from "../design-system";

<Slider defaultValue={50} min={0} max={100} />`}
            />
          </Section>
        </PageWrapper>
      );

    case "badge":
      return (
        <PageWrapper title="Badge" description="Labels and status indicators.">
          <Section title="Variants">
            <HStack spacing={3} flexWrap="wrap">
              <Badge colorScheme="teal">Teal</Badge>
              <Badge colorScheme="blue">Blue</Badge>
              <Badge colorScheme="gray">Gray</Badge>
              <Badge colorScheme="green">Success</Badge>
              <Badge colorScheme="red">Error</Badge>
            </HStack>
          </Section>
          <Section title="Sizes">
            <HStack spacing={3} flexWrap="wrap" align="center">
              <Badge size="sm">Small</Badge>
              <Badge size="md">Medium</Badge>
              <Badge size="lg">Large</Badge>
            </HStack>
          </Section>
          <Section title="Accessibility (WCAG 2.1 AA)">
            <Text fontSize="sm" color="figma.fg_muted" mb={2}>
              Badges are presentational; pair with text or <code>aria-label</code> when they convey
              status (e.g. “New”, “Draft”). Ensure badge text meets contrast (1.4.3).
            </Text>
          </Section>
          <Section title="Code example">
            <CodeBlock
              code={`import { Badge } from "../design-system";

<Badge colorScheme="teal">Teal</Badge>
<Badge colorScheme="red">Error</Badge>
<Badge size="sm">Small</Badge>`}
            />
          </Section>
        </PageWrapper>
      );

    case "text":
      return (
        <PageWrapper title="Text" description="Body and paragraph text.">
          <Section title="Sizes">
            <VStack align="stretch" spacing={2}>
              <Text fontSize="xs">Extra small (xs)</Text>
              <Text fontSize="sm">Small (sm)</Text>
              <Text fontSize="md">Medium (md)</Text>
              <Text fontSize="lg">Large (lg)</Text>
            </VStack>
          </Section>
          <Section title="Weights">
            <VStack align="stretch" spacing={2}>
              <Text fontWeight="normal">Normal weight</Text>
              <Text fontWeight="semibold">Semibold</Text>
              <Text fontWeight="bold">Bold</Text>
            </VStack>
          </Section>
          <Section title="Accessibility (WCAG 2.1 AA)">
            <Text fontSize="sm" color="figma.fg_muted" mb={2}>
              Use for paragraphs and inline text, not for headings (use <code>Heading</code> for
              that). Ensure text contrast is at least 4.5:1 for normal, 3:1 for large (1.4.3).
            </Text>
          </Section>
          <Section title="Code example">
            <CodeBlock
              code={`import { Text } from "../design-system";

<Text fontSize="sm">Small text</Text>
<Text fontWeight="semibold">Bold text</Text>
<Text color="figma.fg_muted">Muted text</Text>`}
            />
          </Section>
        </PageWrapper>
      );

    case "heading":
      return (
        <PageWrapper title="Heading" description="Section and page titles.">
          <Section title="Sizes">
            <VStack align="stretch" spacing={2}>
              <Heading size="xs">Heading xs</Heading>
              <Heading size="sm">Heading sm</Heading>
              <Heading size="md">Heading md</Heading>
              <Heading size="lg">Heading lg</Heading>
              <Heading size="xl">Heading xl</Heading>
              <Heading size="2xl">Heading 2xl</Heading>
            </VStack>
          </Section>
          <Section title="Accessibility (WCAG 2.1 AA)">
            <Text fontSize="sm" color="figma.fg_muted" mb={2}>
              Use <code>as</code> to match heading level to document outline (e.g. <code>as="h1"</code>{" "}
              for page title, <code>as="h2"</code> for sections) so structure is programmatically
              available (1.3.1). Don’t skip levels.
            </Text>
          </Section>
          <Section title="Code example">
            <CodeBlock
              code={`import { Heading } from "../design-system";

<Heading size="lg">Page title</Heading>
<Heading size="md" as="h2">Section title</Heading>`}
            />
          </Section>
        </PageWrapper>
      );

    case "avatar":
      return (
        <PageWrapper title="Avatar" description="User or entity image with fallback.">
          <Section title="Sizes">
            <HStack spacing={4} flexWrap="wrap">
              <Avatar size="xs" name="Jane Doe" />
              <Avatar size="sm" name="Jane Doe" />
              <Avatar size="md" name="Jane Doe" />
              <Avatar size="lg" name="Jane Doe" />
              <Avatar size="xl" name="Jane Doe" />
            </HStack>
          </Section>
          <Section title="With image">
            <HStack spacing={4}>
              <Avatar src="https://i.pravatar.cc/128?u=1" name="Jane" />
              <Avatar src="https://i.pravatar.cc/128?u=2" name="John" />
            </HStack>
          </Section>
          <Section title="Accessibility (WCAG 2.1 AA)">
            <Text fontSize="sm" color="figma.fg_muted" mb={2}>
              Always provide <code>name</code> for fallback initials and accessible name (1.1.1).
              For decorative avatars, consider <code>aria-hidden="true"</code> so screen readers
              skip them when they don’t convey information.
            </Text>
          </Section>
          <Section title="Code example">
            <CodeBlock
              code={`import { Avatar } from "../design-system";

<Avatar name="Jane Doe" />
<Avatar src="/photo.jpg" name="Jane" size="lg" />`}
            />
          </Section>
        </PageWrapper>
      );

    case "accordion":
      return (
        <PageWrapper title="Accordion" description="Expandable sections styled with Figma tokens (figma.fg, figma.bgSubtle, figma.borderDefault).">
          <Section title="Items">
            <Accordion
              items={[
                { title: "First item", content: "Content for the first accordion panel. Uses figma.fg_muted and figma.bgSubtle." },
                { title: "Second item", content: "Content for the second panel. Borders use figma.borderDefault; radii from theme.radii.md." },
                { title: "Third item", content: "Content for the third panel. Button hover/expanded use figma.bgSubtle." },
              ]}
            />
          </Section>
          <Section title="Accessibility (WCAG 2.1 AA)">
            <Text fontSize="sm" color="figma.fg_muted" mb={2}>
              Use a heading level for each trigger (e.g. <code>h2</code>) and ensure focus is visible (2.4.7).
              Panel content should be associated with the trigger for screen readers.
            </Text>
          </Section>
          <Section title="Code example">
            <CodeBlock
              code={`import { Accordion } from "../design-system";

<Accordion
  items={[
    { title: "First", content: "Panel content." },
    { title: "Second", content: "More content." },
  ]}
/>`}
            />
          </Section>
        </PageWrapper>
      );

    case "action-bar":
      return (
        <PageWrapper title="Action bar" description="Horizontal bar for primary actions. Uses Figma tokens: figma.actionBarBg, figma.actionBarBorder, figma.actionBarFg.">
          <Section title="Variants">
            <VStack align="stretch" spacing={6}>
              <Box>
                <Text fontSize="sm" color="figma.fg_muted" mb={2}>Actions at end (default)</Text>
                <ActionBar justify="end">
                  <Button colorScheme="teal" variant="outline" label="Cancel" />
                  <Button colorScheme="teal" label="Save" />
                </ActionBar>
              </Box>
              <Box>
                <Text fontSize="sm" color="figma.fg_muted" mb={2}>Actions at start</Text>
                <ActionBar justify="start">
                  <Button colorScheme="teal" variant="ghost" label="Back" />
                  <Button colorScheme="teal" label="Next" />
                </ActionBar>
              </Box>
              <Box>
                <Text fontSize="sm" color="figma.fg_muted" mb={2}>Space between</Text>
                <ActionBar justify="space-between">
                  <Button colorScheme="teal" variant="ghost" label="Reset" />
                  <Button colorScheme="teal" label="Apply" />
                </ActionBar>
              </Box>
            </VStack>
          </Section>
          <Section title="Variables (Figma)">
            <Text fontSize="sm" color="figma.fg_muted" mb={2}>
              Action bar uses semantic tokens: <code>figma.actionBarBg</code>, <code>figma.actionBarBorder</code>, <code>figma.actionBarFg</code>. Defined in figma-tokens.ts as action-bar/bg, action-bar/border, action-bar/fg (light and dark).
            </Text>
          </Section>
          <Section title="Code example">
            <CodeBlock
              code={`import { ActionBar, Button } from "../design-system";

<ActionBar justify="end">
  <Button colorScheme="teal" variant="outline" label="Cancel" />
  <Button colorScheme="teal" label="Save" />
</ActionBar>`}
            />
          </Section>
        </PageWrapper>
      );

    case "alert":
      return (
        <PageWrapper title="Alert" description="Feedback and status messages.">
          <Section title="Status">
            <VStack align="stretch" spacing={4}>
              <Alert status="success" borderRadius="md">
                <AlertIcon />
                <AlertTitle>Success</AlertTitle>
                <AlertDescription>Your changes have been saved.</AlertDescription>
              </Alert>
              <Alert status="error" borderRadius="md">
                <AlertIcon />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>Something went wrong.</AlertDescription>
              </Alert>
              <Alert status="warning" borderRadius="md">
                <AlertIcon />
                <AlertTitle>Warning</AlertTitle>
                <AlertDescription>Please review before continuing.</AlertDescription>
              </Alert>
              <Alert status="info" borderRadius="md">
                <AlertIcon />
                <AlertTitle>Info</AlertTitle>
                <AlertDescription>New update available.</AlertDescription>
              </Alert>
            </VStack>
          </Section>
          <Section title="Accessibility (WCAG 2.1 AA)">
            <Text fontSize="sm" color="figma.fg_muted" mb={2}>
              Use <code>AlertTitle</code> and <code>AlertDescription</code> so content is announced.
              For critical errors, use <code>role="alert"</code> so screen readers announce
              immediately (4.1.3). Ensure alert text meets contrast (1.4.3).
            </Text>
          </Section>
          <Section title="Code example">
            <CodeBlock
              code={`import { Alert, AlertIcon, AlertTitle, AlertDescription } from "../design-system";

<Alert status="success">
  <AlertIcon />
  <AlertTitle>Success</AlertTitle>
  <AlertDescription>Your changes have been saved.</AlertDescription>
</Alert>`}
            />
          </Section>
        </PageWrapper>
      );

    case "breadcrumb":
      return (
        <PageWrapper title="Breadcrumb" description="Navigation trail.">
          <Section title="Default">
            <Breadcrumb>
              <BreadcrumbItem>
                <BreadcrumbLink href="#">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="#">Docs</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="#" isCurrentPage>
                  Breadcrumb
                </BreadcrumbLink>
              </BreadcrumbItem>
            </Breadcrumb>
          </Section>
          <Section title="Accessibility (WCAG 2.1 AA)">
            <Text fontSize="sm" color="figma.fg_muted" mb={2}>
              Use <code>nav</code> with <code>aria-label="Breadcrumb"</code> so the trail is
              announced (1.3.1). Mark current page with <code>isCurrentPage</code> (or{" "}
              <code>aria-current="page"</code>) so screen readers know where the user is (2.4.8).
            </Text>
          </Section>
          <Section title="Code example">
            <CodeBlock
              code={`import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator } from "../design-system";

<Breadcrumb>
  <BreadcrumbItem>
    <BreadcrumbLink href="#">Home</BreadcrumbLink>
  </BreadcrumbItem>
  <BreadcrumbSeparator />
  <BreadcrumbItem>
    <BreadcrumbLink href="#" isCurrentPage>Current</BreadcrumbLink>
  </BreadcrumbItem>
</Breadcrumb>`}
            />
          </Section>
        </PageWrapper>
      );

    case "divider":
      return (
        <PageWrapper title="Divider" description="Visual separator.">
          <Section title="Horizontal">
            <VStack align="stretch" spacing={4}>
              <Text>Content above</Text>
              <Divider />
              <Text>Content below</Text>
            </VStack>
          </Section>
          <Section title="Vertical">
            <HStack height="80px">
              <Text>Left</Text>
              <Divider orientation="vertical" />
              <Text>Right</Text>
            </HStack>
          </Section>
          <Section title="Accessibility (WCAG 2.1 AA)">
            <Text fontSize="sm" color="figma.fg_muted" mb={2}>
              Dividers are presentational; use <code>role="separator"</code> (Chakra does this) so
              assistive tech can skip them. Don’t use a divider as the only way to convey meaning.
            </Text>
          </Section>
          <Section title="Code example">
            <CodeBlock
              code={`import { Divider } from "../design-system";

<Divider />
<Divider orientation="vertical" />`}
            />
          </Section>
        </PageWrapper>
      );

    case "spinner":
      return (
        <PageWrapper title="Spinner" description="Loading indicator.">
          <Section title="Sizes">
            <HStack spacing={6}>
              <Spinner size="sm" />
              <Spinner size="md" />
              <Spinner size="lg" />
              <Spinner size="xl" />
            </HStack>
          </Section>
          <Section title="Accessibility (WCAG 2.1 AA)">
            <Text fontSize="sm" color="figma.fg_muted" mb={2}>
              Pair with live region text (e.g. <code>aria-live="polite"</code> and “Loading…”)
              so screen readers announce loading state (4.1.3). Or use <code>aria-busy="true"</code>{" "}
              on the container that is loading.
            </Text>
          </Section>
          <Section title="Code example">
            <CodeBlock
              code={`import { Spinner } from "../design-system";

<Spinner />
<Spinner size="lg" />`}
            />
          </Section>
        </PageWrapper>
      );

    case "combobox":
      return (
        <PageWrapper title="Combobox" description="Input with dropdown list. Uses figma.default, figma.borderDefault, figma.fg, figma.bgSubtle.">
          <Section title="Default">
            <Combobox
              options={[
                { value: "a", label: "Option A" },
                { value: "b", label: "Option B" },
                { value: "c", label: "Option C" },
              ]}
              placeholder="Select..."
              maxW="sm"
            />
          </Section>
          <Section title="Code example">
            <CodeBlock
              code={`import { Combobox } from "../design-system";

<Combobox
  options={[{ value: "a", label: "Option A" }, ...]}
  placeholder="Select..."
/>`}
            />
          </Section>
        </PageWrapper>
      );

    case "container":
      return (
        <PageWrapper
          title="Container"
          description="Centered content with max width (1200px)."
        >
          <Section title="Usage">
            <Container p={6} bg="figma.bgSubtle" color="figma.fg" borderRadius="md">
              <Text>Content inside Container is centered and constrained to max width.</Text>
            </Container>
          </Section>
          <Section title="Accessibility (WCAG 2.1 AA)">
            <Text fontSize="sm" color="figma.fg_muted" mb={2}>
              Container is layout-only; ensure inner content has proper headings and landmarks.
              Use <code>main</code>, <code>nav</code>, or <code>aside</code> where appropriate for
              structure (1.3.1).
            </Text>
          </Section>
          <Section title="Code example">
            <CodeBlock
              code={`import { Container } from "../design-system";

<Container maxW="1200px" p={6}>
  Centered content
</Container>`}
            />
          </Section>
        </PageWrapper>
      );

    case "dialog": {
      const DialogDemo = () => {
        const { isOpen, onOpen, onClose } = useDisclosure();
        return (
          <>
            <Button colorScheme="teal" label="Open dialog" onClick={onOpen} />
            <Dialog
              title="Dialog title"
              isOpen={isOpen}
              onClose={onClose}
              footer={
                <HStack spacing={3} justify="flex-end">
                  <Button colorScheme="teal" variant="outline" label="Cancel" onClick={onClose} />
                  <Button colorScheme="teal" label="Confirm" onClick={onClose} />
                </HStack>
              }
            >
              <Text>Dialog body. Uses figma.default, figma.fg, figma.fg_muted.</Text>
            </Dialog>
          </>
        );
      };
      return (
        <PageWrapper title="Dialog" description="Modal dialog. Uses figma.default, figma.borderDefault, figma.fg, figma.fg_muted.">
          <Section title="Default">
            <DialogDemo />
          </Section>
          <Section title="Code example">
            <CodeBlock
              code={`import { Dialog, Button } from "../design-system";
import { useDisclosure } from "@chakra-ui/react";

const { isOpen, onOpen, onClose } = useDisclosure();
<Dialog title="Title" isOpen={isOpen} onClose={onClose}>
  Body content
  <Dialog.Footer>...</Dialog.Footer>
</Dialog>`}
            />
          </Section>
        </PageWrapper>
      );
    }

    case "stack":
      return (
        <PageWrapper title="Stack" description="Vertical or horizontal stack with gap.">
          <Section title="VStack (vertical)">
            <VStack align="stretch" spacing={4} bg="figma.bgSubtle" p={4} borderRadius="md">
              <Box bg="figma.default" color="figma.fg" p={3} borderRadius="md" w="full">Item 1</Box>
              <Box bg="figma.default" color="figma.fg" p={3} borderRadius="md" w="full">Item 2</Box>
              <Box bg="figma.default" color="figma.fg" p={3} borderRadius="md" w="full">Item 3</Box>
            </VStack>
          </Section>
          <Section title="HStack (horizontal)">
            <HStack spacing={4} flexWrap="wrap">
              <Box bg="teal.100" p={3} borderRadius="md">A</Box>
              <Box bg="teal.100" p={3} borderRadius="md">B</Box>
              <Box bg="teal.100" p={3} borderRadius="md">C</Box>
            </HStack>
          </Section>
          <Section title="Accessibility (WCAG 2.1 AA)">
            <Text fontSize="sm" color="figma.fg_muted" mb={2}>
              Stack is layout-only; order of children is the DOM order, so focus and reading order
              follow the visual order (2.4.3). Use semantic elements inside (e.g. list, headings).
            </Text>
          </Section>
          <Section title="Code example">
            <CodeBlock
              code={`import { VStack, HStack } from "../design-system";

<VStack spacing={4}>...</VStack>
<HStack spacing={4} flexWrap="wrap">...</HStack>`}
            />
          </Section>
        </PageWrapper>
      );

    case "box":
      return (
        <PageWrapper title="Box" description="Generic layout and styling container.">
          <Section title="Usage">
            <Box p={6} bg="figma.bgSubtle" color="figma.fg" borderRadius="md" borderWidth="1px" borderColor="figma.borderDefault">
              <Text>Box is the base layout primitive. Use for padding, background, border, etc.</Text>
            </Box>
          </Section>
          <Section title="Accessibility (WCAG 2.1 AA)">
            <Text fontSize="sm" color="figma.fg_muted" mb={2}>
              Box is presentational; use <code>as</code> to render a semantic element (e.g.{" "}
              <code>as="main"</code>, <code>as="section"</code>) when it represents a landmark or
              region (1.3.1).
            </Text>
          </Section>
          <Section title="Code example">
            <CodeBlock
              code={`import { Box } from "../design-system";

<Box p={4} bg="gray.50" borderRadius="md">
  Content
</Box>`}
            />
          </Section>
        </PageWrapper>
      );

    case "flex":
      return (
        <PageWrapper title="Flex" description="Flexbox layout.">
          <Section title="Row">
            <Flex gap={4} flexWrap="wrap">
              <Box flex="1" minW="120px" p={4} bg="figma.bgSubtle" color="figma.fg" borderRadius="md">1</Box>
              <Box flex="1" minW="120px" p={4} bg="figma.bgSubtle" color="figma.fg" borderRadius="md">2</Box>
              <Box flex="1" minW="120px" p={4} bg="figma.bgSubtle" color="figma.fg" borderRadius="md">3</Box>
            </Flex>
          </Section>
          <Section title="Centered">
            <Flex justify="center" align="center" h="120px" bg="figma.bgSubtle" color="figma.fg" borderRadius="md">
              <Text>Centered content</Text>
            </Flex>
          </Section>
          <Section title="Accessibility (WCAG 2.1 AA)">
            <Text fontSize="sm" color="figma.fg_muted" mb={2}>
              Flex is layout-only; ensure child order in the DOM matches the intended reading and
              focus order (2.4.3). Use semantic elements or ARIA when Flex wraps interactive content.
            </Text>
          </Section>
          <Section title="Code example">
            <CodeBlock
              code={`import { Flex } from "../design-system";

<Flex gap={4} flexWrap="wrap">...</Flex>
<Flex justify="center" align="center">...</Flex>`}
            />
          </Section>
        </PageWrapper>
      );

    case "grid":
      return (
        <PageWrapper title="Grid" description="SimpleGrid for responsive columns.">
          <Section title="Responsive columns">
            <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={4}>
              {[1, 2, 3, 4, 5, 6].map((n) => (
                <Box key={n} p={4} bg="figma.default" color="figma.fg" borderRadius="md" borderWidth="1px" borderColor="figma.borderDefault">
                  Item {n}
                </Box>
              ))}
            </SimpleGrid>
          </Section>
          <Section title="Accessibility (WCAG 2.1 AA)">
            <Text fontSize="sm" color="figma.fg_muted" mb={2}>
              Grid is layout-only; order follows DOM order (2.4.3). For data grids (tables), use{" "}
              <code>role="grid"</code>, <code>aria-label</code>, and proper row/cell semantics
              (1.3.1).
            </Text>
          </Section>
          <Section title="Code example">
            <CodeBlock
              code={`import { SimpleGrid, Box } from "../design-system";

<SimpleGrid columns={{ base: 1, md: 3 }} spacing={4}>
  <Box>1</Box>
  <Box>2</Box>
  <Box>3</Box>
</SimpleGrid>`}
            />
          </Section>
        </PageWrapper>
      );

    default:
      return (
        <PageWrapper title={pageId} description="Component page.">
          <Text>No content for this page yet.</Text>
        </PageWrapper>
      );
  }
}
