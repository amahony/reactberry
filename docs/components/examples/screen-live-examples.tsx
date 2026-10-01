"use client";

import { BreakpointProvider } from "@reactberry/system";
import { Screen } from "@reactberry/system/blocks";
import { Box, Text } from "@reactberry/system/elements";

const Variant = ({ device }: { device: string }) => (
  <Box p="m" skin="surface" shape="rounded">
    <Text as="p" fontWeight="700" m="0">
      {device} variant
    </Text>
    <Text as="p" color="secondary" m="0">
      Resize the window to switch variants.
    </Text>
  </Box>
);

const Desktop = () => <Variant device="Desktop" />;
const Phone = () => <Variant device="Phone" />;

export default function ScreenLiveExamples() {
  return (
    <Box display="flex" flexDirection="column" gap="s">
      <Text as="h3" fontSize="l" fontWeight="700" m="0">
        Example: per-viewport variants
      </Text>
      <Text as="p" color="secondary" m="0">
        Only `desktop` and `phone` are supplied, so tablet falls back to the desktop variant.
      </Text>
      <BreakpointProvider>
        <Screen preset="clean" insets={false} minHeight="auto" desktop={Desktop} phone={Phone} />
      </BreakpointProvider>
    </Box>
  );
}
