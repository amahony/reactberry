"use client";

import { useState } from "react";
import { BottomSheet } from "@reactberry/system/blocks";
import { Box, Button, Text } from "@reactberry/system/elements";

export default function BottomSheetLiveExamples() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Box display="flex" flexDirection="column" gap="s">
      <Text as="h3" fontSize="l" fontWeight="700" m="0">
        Example: controlled sheet
      </Text>
      <Text as="p" color="secondary" m="0">
        Open the sheet from a button, then drag it down, press Escape, or click the backdrop to close it.
      </Text>
      <Box>
        <Button variant="default" onClick={() => setIsOpen(true)}>
          Open bottom sheet
        </Button>
      </Box>
      <BottomSheet
        open={isOpen}
        onOpenChange={setIsOpen}
        title="Filters"
        description="Narrow down the results."
        peekHeight={0}
        maxHeight="24rem"
        showCloseButton
      >
        <Box p="m" display="flex" flexDirection="column" gap="s">
          <Text as="p" m="0">
            Sheet content sizes to its children up to `maxHeight`.
          </Text>
          <Button variant="default" onClick={() => setIsOpen(false)}>
            Apply
          </Button>
        </Box>
      </BottomSheet>
    </Box>
  );
}
