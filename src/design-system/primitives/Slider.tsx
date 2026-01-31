import React from "react";
import {
  Slider as ChakraSlider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
} from "@chakra-ui/react";
import type { SliderProps as ChakraSliderProps } from "@chakra-ui/react";

export interface SliderProps extends ChakraSliderProps {}

/**
 * Slider — Chakra UI component, styled by Figma tokens (theme).
 * Uses figma.bgSubtle (track), teal.500 (filled + thumb); theme.radii.full.
 */
export const Slider = React.forwardRef<HTMLDivElement, SliderProps>(
  ({ colorScheme = "teal", size = "md", ...props }, ref) => (
    <ChakraSlider ref={ref} colorScheme={colorScheme} size={size} {...props}>
      <SliderTrack bg="figma.bgSubtle" borderRadius="full">
        <SliderFilledTrack bg="teal.500" borderRadius="full" />
      </SliderTrack>
      <SliderThumb
        bg="teal.500"
        borderWidth="2px"
        borderColor="figma.default"
        boxShadow="sm"
        _hover={{ bg: "teal.600" }}
        _focus={{ boxShadow: "0 0 0 2px var(--chakra-colors-teal-500)" }}
      />
    </ChakraSlider>
  )
);
Slider.displayName = "Slider";

type SliderWithSub = typeof Slider & { Track: typeof SliderTrack; FilledTrack: typeof SliderFilledTrack; Thumb: typeof SliderThumb };
(Slider as SliderWithSub).Track = SliderTrack;
(Slider as SliderWithSub).FilledTrack = SliderFilledTrack;
(Slider as SliderWithSub).Thumb = SliderThumb;
