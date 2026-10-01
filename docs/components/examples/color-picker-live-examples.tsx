"use client";

import { useState } from "react";
import { ColorPicker } from "@reactberry/system/blocks";
import { Box, Text } from "@reactberry/system/elements";

export default function ColorPickerLiveExamples() {
  const [color, setColor] = useState("#3b82f6");
  const [alphaColor, setAlphaColor] = useState("#10b98180");

  return (
    <Box display="flex" flexDirection="column" gap="l">
      <Box display="flex" flexDirection="column" gap="s">
        <Text as="h3" fontSize="l" fontWeight="700" m="0">
          Example 1: solid colour
        </Text>
        <Box display="flex" alignItems="center" gap="s">
          <ColorPicker color={color} onChange={setColor} alpha={false} placement="bottom start" />
          <Text as="code" fontSize="s">
            {color}
          </Text>
        </Box>
      </Box>

      <Box display="flex" flexDirection="column" gap="s">
        <Text as="h3" fontSize="l" fontWeight="700" m="0">
          Example 2: with alpha channel
        </Text>
        <Box display="flex" alignItems="center" gap="s">
          <ColorPicker color={alphaColor} onChange={setAlphaColor} placement="bottom start" />
          <Text as="code" fontSize="s">
            {alphaColor}
          </Text>
        </Box>
      </Box>
    </Box>
  );
}
