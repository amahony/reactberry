import { Box, Text } from "@reactberry/system/elements";

import DocsNavLink from "@/components/docs-nav-link";
import MdxContent from "@/components/mdx-content";
import { getGuide, getGuides } from "@/lib/docs";

export default function GuidesPage() {
  const intro = getGuide("index");
  const guides = getGuides().filter((guide) => guide.path !== "index");

  return (
    <Box display="flex" flexDirection="column" gap="l">
      <Box display="flex" flexDirection="column" gap="s" pb="m" borderBottom="1px solid" borderColor="palette.neutrals.3">
        <Text as="h1" fontSize="xxxl" fontWeight="700" m="0">
          Guides
        </Text>
        <Text as="p" fontSize="m" color="secondary" m="0">
          {intro?.description ?? "Curated walkthroughs and implementation notes for building with Reactberry."}
        </Text>
      </Box>

      {intro ? <MdxContent code={intro.body} contentKind="guides" sourcePath={intro.sourcePath} /> : null}

      {guides.length ? (
        <Box display="grid" gridTemplateColumns={["1fr", "1fr 1fr"]} gap="m">
          {guides.map((guide) => (
            <Box key={guide.path} p="m" skin="surface" shape="rounded" display="flex" flexDirection="column" gap="s">
              <Box display="flex" flexDirection="column" gap="xs">
                {guide.featured ? (
                  <Text as="p" fontSize="xs" color="tertiary" textTransform="uppercase" m="0">
                    Featured
                  </Text>
                ) : null}
                <Text as="h2" fontSize="l" fontWeight="700" m="0">
                  {guide.title}
                </Text>
                {guide.description ? (
                  <Text as="p" fontSize="s" color="secondary" m="0">
                    {guide.description}
                  </Text>
                ) : null}
                {guide.date ? (
                  <Text as="p" fontSize="xs" color="tertiary" m="0">
                    {guide.date}
                  </Text>
                ) : null}
              </Box>
              <Box>
                <DocsNavLink href={guide.href} label="Open guide" />
              </Box>
            </Box>
          ))}
        </Box>
      ) : (
        <Box p="m" skin="surface" shape="rounded">
          <Text as="p" fontSize="s" color="secondary" m="0">
            More guides can be added over time in `docs/content/guides`.
          </Text>
        </Box>
      )}
    </Box>
  );
}