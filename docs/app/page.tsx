import Link from "next/link";
import { Box, Text } from "reactberry/elements";

import { getDocsPages, getGuides } from "@/lib/docs";

export default function HomePage() {
  const docsCount = getDocsPages().length;
  const guidesCount = getGuides().length;

  return (
    <Box minHeight="100vh" p={["m", "xl"]} display="flex" flexDirection="column" gap="xl">
      <Box maxWidth="960px" mx="auto" display="flex" flexDirection="column" gap="m">
        <Text as="p" fontSize="s" color="secondary" m="0">
          Reactberry documentation
        </Text>
        <Text as="h1" fontSize="xxxl" fontWeight="700" m="0">
          A docs site built with the same design system it documents.
        </Text>
        <Text as="p" fontSize="l" color="secondary" m="0">
          Browse {docsCount} docs pages and {guidesCount} guides rendered through Reactberry primitives.
        </Text>
        <Box display="flex" gap="s" flexWrap="wrap">
          <Link href="/docs">
            <Box as="span" display="inline-flex" p="s" skin="primary" shape="rounded">
              <Text as="span" fontSize="s" fontWeight="700">
                Open documentation
              </Text>
            </Box>
          </Link>
          <Link href="/guides">
            <Box as="span" display="inline-flex" p="s" skin="surface" shape="rounded">
              <Text as="span" fontSize="s" fontWeight="700">
                Browse guides
              </Text>
            </Box>
          </Link>
        </Box>
      </Box>

      <Box maxWidth="960px" mx="auto" display="grid" gridTemplateColumns={["1fr", "1fr 1fr"]} gap="m">
        <Box p="m" skin="surface" shape="rounded" display="flex" flexDirection="column" gap="xs">
          <Text as="h2" fontSize="l" fontWeight="700" m="0">
            Documentation
          </Text>
          <Text as="p" fontSize="s" color="secondary" m="0">
            Dedicated product-style reference pages sourced from `docs/content/docs`.
          </Text>
        </Box>
        <Box p="m" skin="surface" shape="rounded" display="flex" flexDirection="column" gap="xs">
          <Text as="h2" fontSize="l" fontWeight="700" m="0">
            Guides
          </Text>
          <Text as="p" fontSize="s" color="secondary" m="0">
            Walkthroughs and curated learning content sourced from `docs/content/guides`.
          </Text>
        </Box>
      </Box>
    </Box>
  );
}