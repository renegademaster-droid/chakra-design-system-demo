/**
 * Design system foundation: Chakra theme with Figma MCP tokens.
 * Re-export app theme so design-system components use the same tokens.
 */
export { default as theme } from "../../theme/theme";
export { figmaVariableDefs } from "../../theme/figma-tokens";
export {
  figmaVariablesToChakraTheme,
  type FigmaVariableDefs,
} from "../../theme/figma-to-chakra";
