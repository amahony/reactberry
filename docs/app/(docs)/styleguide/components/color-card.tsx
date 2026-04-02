"use client";

import chroma from "chroma-js";
import { Box, Text } from "@reactberry/system/elements";

export default function ColorCard({
  item,
  isTransparent,
}: {
  item: { label: string; value: string };
  isTransparent?: boolean;
}) {
  return (
    <Box bg="card" shape="rounded" $shadow="medium" position="relative">
      <Box
        aspect="5/3"
        shape="roundedTop"
        position="relative"
        zIndex={1}
        bg={item.value}
      />
      <Box p="small">
        <Text as="div" fontSize="small" m="0" fontWeight="700">
          {item.label}
        </Text>
        <Text as="div" fontSize="small" color="secondary" fontWeight="500" py="xxsmall">
          {item.value}
        </Text>
        <Text as="div" fontSize="xsmall" color="secondary" fontWeight="500">
          {chroma(item.value).css("hsla")}
        </Text>
      </Box>
      {isTransparent ? (
        <Box
          color="base"
          shape="roundedTop"
          aspect="5/3"
          backgroundSize="2rem 2rem"
          backgroundPosition="0 0,1rem 0,1rem -1rem,0 1rem"
          backgroundImage="linear-gradient(45deg, currentColor 25%, #0000 25%), linear-gradient(135deg, currentColor 25%, #0000 25%), linear-gradient(45deg, #0000 75%, currentColor 75%), linear-gradient(135deg, #0000 75%, currentColor 75%)"
          position="absolute"
          top="0"
          width="100%"
          zIndex={0}
        />
      ) : null}
    </Box>
  );
}
