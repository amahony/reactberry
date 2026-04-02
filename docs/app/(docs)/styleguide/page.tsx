"use client";

import { Box, Text } from "@reactberry/system/elements";
import { themes } from "@reactberry/system/themes";
import { Collection, Divider } from "@reactberry/system/blocks";

import { useDocsTheme } from "@/components/docs-theme-provider";

import ColorCard from "./components/color-card";
import SkinCard from "./components/skin-card";

type ThemeType = Record<string, any>;
type PaletteItem = { label: string; value: string[] };

function Skinsmap({ theme }: { theme: ThemeType }) {
  const skinGroups = [
    { title: "Primary Skins", description: "Main interface skin combinations", skins: ["primary", "accent", "neutral"] },
    { title: "Color Skins", description: "Skins for different color variations", skins: ["red", "yellow", "orange", "green", "teal", "blue", "purple", "pink", "gray"] },
    { title: "Surface Skins", description: "Skins for different surface treatments", skins: ["base", "surface", "panel", "card", "overlay"] },
    { title: "Spacial Skins", description: "Skins for different surface treatments", skins: ["translucent", "transparent"] },
  ];
  const isTransparent = skinGroups.some((group) => group.skins.includes("translucent") || group.skins.includes("transparent"));

  return (
    <Box display="grid" gap="large" gridTemplateColumns={["1fr", "1fr 4fr"]}>
      <Box><Box position="sticky" top="4rem"><Text as="h2" color="primary">Skin Combinations</Text><Text color="secondary">Skin combinations are used to create a visual hierarchy and ensure a consistent look and feel across the application. Each skin combination is made up of a color pair that is used for text and background.</Text></Box></Box>
      <Box>{skinGroups.map((group, groupIndex) => { const groupSkins = group.skins.filter((key) => theme.colorPairs?.[key]); if (groupSkins.length === 0) return null; return (<Box key={group.title}>{groupIndex > 0 ? <Divider /> : null}<Text as="h3" fontSize="large" mb="0" color="primary">{group.title}</Text><Text fontSize="small" color="secondary" mb="small">{group.description}</Text><Collection colsize="small">{groupSkins.map((key) => <SkinCard key={key} item={key} isTransparent={isTransparent} theme={theme} />)}</Collection></Box>); })}</Box>
    </Box>
  );
}

function Colormap({ theme }: { theme: ThemeType }) {
  const colorGroups = [
    { title: "Brand Colors", description: "Primary brand identity colors", colors: ["brand", "accent", "neutral"] },
    { title: "Spectre Colors", description: "Full spectrum of color variations", colors: ["red", "yellow", "orange", "green", "teal", "blue", "purple", "pink", "white", "gray", "black"] },
    { title: "Interface Colors", description: "Colors used for UI structure and hierarchy", colors: ["base", "surface", "panel", "card", "overlay", "primary", "secondary", "tertiary"] },
    { title: "Feedback Colors", description: "Colors used for system feedback and alerts", colors: ["success", "info", "warning", "error"] },
    { title: "Contrast Colors", description: "Colors used for text and background contrast", colors: ["dark", "light"] },
  ];

  return (
    <Box display="grid" gap="large" gridTemplateColumns={["1fr", "1fr 4fr"]}>
      <Box><Box position="sticky" top="4rem"><Text as="h2" color="primary">Color Tokens</Text><Text color="secondary">These colors are used throughout the system as the main color palette. Together they create the visual hierarchy and ensure consistency across the application.</Text></Box></Box>
      <Box>{colorGroups.map((group, groupIndex) => { const groupColors = group.colors.filter((key) => theme.colors?.[key]).map((key) => ({ label: key, value: theme.colors[key] })); if (groupColors.length === 0) return null; return (<Box key={group.title}>{groupIndex > 0 ? <Divider /> : null}<Text as="h3" fontSize="large" mb="0" color="primary">{group.title}</Text><Text fontSize="small" color="secondary" mb="small">{group.description}</Text><Collection colsize="xsmall">{groupColors.map((item) => <Box key={item.label} boxShadow="small"><ColorCard item={item} /></Box>)}</Collection></Box>); })}</Box>
    </Box>
  );
}

function Palettemap({ theme }: { theme: ThemeType }) {
  const paletteGroups = [
    { title: "Base Palettes", description: "Foundation color palettes for the system", palettes: ["brands", "accents", "neutrals"] },
    { title: "Monochrome Palettes", description: "Grayscale and neutral color variations", palettes: ["darks", "lights"] },
    { title: "Spectral Palettes", description: "Full spectrum of color variations", palettes: ["reds", "yellows", "oranges", "greens", "teals", "blues", "purples", "pinks", "grays"] },
  ];

  return (
    <Box display="grid" gap="large" gridTemplateColumns={["1fr", "1fr 4fr"]}>
      <Box><Box position="sticky" top="4rem"><Text as="h2" color="primary">Palette Colors</Text><Text color="secondary">Complete color palettes with all available shades and variations.</Text></Box></Box>
      <Box>{paletteGroups.map((group, groupIndex) => { const groupPalettes = group.palettes.filter((key) => theme.colors?.palette?.[key]).map((key) => ({ label: key, value: theme.colors.palette[key] })); if (groupPalettes.length === 0) return null; return (<Box key={group.title}>{groupIndex > 0 ? <Divider /> : null}<Text as="h3" fontSize="large" mb="0" color="primary">{group.title}</Text><Text fontSize="small" color="secondary" mb="small">{group.description}</Text>{groupPalettes.map((item: PaletteItem) => <Box key={item.label}><Text as="h4" fontSize="medium" mb="0" color="primary" textTransform="capitalize">{item.label}</Text><Collection colsize="xsmall">{item.value.map((color, index) => <Box key={`${item.label}-${index}`} boxShadow="small"><ColorCard item={{ label: `palette.${item.label}.${index}`, value: color }} /></Box>)}</Collection></Box>)}</Box>); })}</Box>
    </Box>
  );
}

function Transparentmap({ theme }: { theme: ThemeType }) {
  const transparentColors = Object.entries(theme.colors?.transparent ?? {});

  return (
    <Box display="grid" gap="large" gridTemplateColumns={["1fr", "1fr 4fr"]}>
      <Box><Box position="sticky" top="4rem"><Text as="h2" color="primary">Transparent Colors</Text><Text color="secondary">Color variations with different opacity levels for creating depth and overlay effects.</Text></Box></Box>
      <Box>{transparentColors.map(([key, colors]) => (<Box key={key}><Text as="h4" fontSize="medium" mb="0" color="primary" textTransform="capitalize">{key}</Text><Collection colsize="xsmall">{(colors as string[]).map((color, index) => <Box key={`${key}-${index}`} boxShadow="small"><ColorCard isTransparent item={{ label: `transparent.${key}.${index}`, value: color }} /></Box>)}</Collection></Box>))}</Box>
    </Box>
  );
}

export default function StyleguidePage() {
  const { themeName } = useDocsTheme();
  const theme = themes[themeName] as ThemeType;

  return (
    <Box p={["medium", "xxxlarge"]}>
        <Colormap theme={theme} />
        <Divider height="2px" />
        <Palettemap theme={theme} />
        <Divider height="2px" />
        <Transparentmap theme={theme} />
        <Divider height="2px" />
        <Skinsmap theme={theme} />
    </Box>
  );
}
