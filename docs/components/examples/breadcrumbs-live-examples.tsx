"use client";

import { Breadcrumbs, pathToBreadcrumbItems } from "@reactberry/system/blocks";
import { Box, Text } from "@reactberry/system/elements";

const siblings = ["Cycle 17", "Cycle 18", "Cycle 19"];

export default function BreadcrumbsLiveExamples() {
  return (
    <Box display="flex" flexDirection="column" gap="l">
      <Box display="flex" flexDirection="column" gap="s">
        <Text as="h3" fontSize="l" fontWeight="700" m="0">
          Example 1: trail with a sibling menu
        </Text>
        <Text as="p" color="secondary" m="0">
          The current crumb exposes a dropdown that receives a `close` callback.
        </Text>
        <Box p="s" skin="surface" shape="rounded">
          <Breadcrumbs
            showHome
            homeHref="/docs"
            items={[
              { label: "Docs", href: "/docs" },
              { label: "Blocks", href: "/docs/blocks" },
              {
                label: "Cycle 18",
                current: true,
                menu: ({ close }: { close: () => void }) => (
                  <Box display="flex" flexDirection="column" gap="xs" p="xs">
                    {siblings.map((label) => (
                      <Text key={label} as="button" textAlign="left" onClick={close}>
                        {label}
                      </Text>
                    ))}
                  </Box>
                ),
              },
            ]}
          />
        </Box>
      </Box>

      <Box display="flex" flexDirection="column" gap="s">
        <Text as="h3" fontSize="l" fontWeight="700" m="0">
          Example 2: derived from a pathname
        </Text>
        <Text as="p" color="secondary" m="0">
          `pathToBreadcrumbItems` builds cumulative hrefs and humanized labels.
        </Text>
        <Box p="s" skin="surface" shape="rounded">
          <Breadcrumbs items={pathToBreadcrumbItems("/docs/blocks/project-templates")} />
        </Box>
      </Box>
    </Box>
  );
}
