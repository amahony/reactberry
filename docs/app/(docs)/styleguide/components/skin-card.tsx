"use client";

import chroma from "chroma-js";
import { Box, Text } from "@reactberry/system/elements";

type SimpleSkin = {
  color?: string;
  backgroundColor?: string;
};

function getContrast(color?: string, backgroundColor?: string) {
  if (!color || !backgroundColor || !chroma.valid(color) || !chroma.valid(backgroundColor)) {
    return { ratio: 1, label: "Fail" };
  }

  const ratio = Number(chroma.contrast(color, backgroundColor).toFixed(2));

  if (ratio >= 7) return { ratio, label: "AAA" };
  if (ratio >= 4.5) return { ratio, label: "AA" };
  if (ratio >= 3) return { ratio, label: "AA Large" };
  return { ratio, label: "Fail" };
}

export default function SkinCard({ item, isTransparent, theme }: { item: string; isTransparent?: boolean; theme: Record<string, any> }) {
  const skinItem = (theme.skins?.[item] ?? {}) as SimpleSkin;
  const colorPairItem = (theme.colorPairs?.[item] ?? skinItem) as SimpleSkin;
  const wcag = getContrast(colorPairItem.color, colorPairItem.backgroundColor);
  const isItemTranslucent = item.toLowerCase().includes("translucent");

  return (
    <Box shape="rounded" skin="card" $shadow="medium" position="relative">
      <Box
        aspect="5/3"
        shape="roundedTop"
        display="flex"
        alignItems="center"
        justifyContent="center"
        position="relative"
        zIndex={1}
        skin={item}
      >
        <Text as="div" fontSize="large" m="0" fontWeight="700">
          {item}
        </Text>
      </Box>
      <Box p="small" color="primary">
        <Text as="div" fontSize="xsmall" m="0" display="flex" alignItems="center" justifyContent="space-between">
          Color: <b>{skinItem.color ?? "—"}</b>
        </Text>
        <Text as="div" fontSize="xsmall" m="0" display="flex" alignItems="center" justifyContent="space-between">
          Background: <b>{skinItem.backgroundColor ?? "—"}</b>
        </Text>
        <Text as="div" fontSize="xsmall" pt="medium">
          <Text as="div" color="tertiary" display="flex" alignItems="center" justifyContent="space-between">
            Contrast: <Text color="primary" fontWeight="700">{wcag.ratio}:1</Text>
          </Text>
          <Text as="div" color="tertiary" display="flex" alignItems="center" justifyContent="space-between">
            WCAG Grade: <Text color="primary" fontWeight="700">{wcag.label}</Text>
          </Text>
        </Text>
      </Box>
      {isTransparent ? (
        <Box
          color={isItemTranslucent ? "brand" : "base"}
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
