"use client";

import { Box, Button, Text } from "@reactberry/system/elements";
import { useDocsTheme } from "@/components/docs-theme-provider";

const themeOptions = [
  { value: "light", label: "Light" },
  { value: "dark", label: "Dark" },
  { value: "system", label: "System" },
] as const;

export default function ThemeToggle() {
  const { themePreference, setThemeName } = useDocsTheme();

  return (
    <Box
      display="inline-flex"
      alignItems="center"
      gap="xxxs"
      p="xxxs"
      border="1px solid"
      borderColor="palette.neutrals.3"
      skin="surface"
      shape="pill"
      flexWrap="nowrap"
    >
      <Text as="span" fontSize="xs" color="tertiary" px="xs" flexShrink={0}>
        Theme
      </Text>
      {themeOptions.map((option) => {
        const active = option.value === themePreference;

        return (
          <Button
            key={option.value}
            type="button"
            variant={active ? "primary" : "ghost"}
            $size="small"
            onClick={() => setThemeName(option.value)}
            aria-pressed={active}
          >
            {option.label}
          </Button>
        );
      })}
    </Box>
  );
}
