import Link from "next/link";
import { Box, Text } from "reactberry/elements";

import { getDocsSections } from "@/lib/docs";

export default function HomePage() {
  const sections = getDocsSections();
  const pageCount = sections.reduce((total, section) => total + section.pages.length, 0);

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
          Browse {pageCount} markdown-backed docs pages rendered through Reactberry primitives.
        </Text>
        <Link href="/docs">
          <Box as="span" display="inline-flex" p="s" skin="primary" shape="rounded">
            <Text as="span" fontSize="s" fontWeight="700">
              Open documentation
            </Text>
          </Box>
        </Link>
      </Box>

      <Box maxWidth="960px" mx="auto" display="grid" gridTemplateColumns={["1fr", "1fr 1fr"]} gap="m">
        {sections.map((section) => (
          <Box key={section.key} p="m" skin="surface" shape="rounded" display="flex" flexDirection="column" gap="xs">
            <Text as="h2" fontSize="l" fontWeight="700" m="0">
              {section.title}
            </Text>
            <Text as="p" fontSize="s" color="secondary" m="0">
              {section.pages.length} pages
            </Text>
            <Text as="p" fontSize="s" color="secondary" m="0">
              {section.pages.slice(0, 3).map((page) => page.title).join(" · ")}
            </Text>
          </Box>
        ))}
      </Box>
    </Box>
  );
}