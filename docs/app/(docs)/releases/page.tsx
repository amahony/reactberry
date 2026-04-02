import { Box, Text } from "@reactberry/system/elements";

import DocsNavLink from "@/components/docs-nav-link";
import MdxContent from "@/components/mdx-content";
import { getLatestRelease, getReleases } from "@/lib/docs";

export default function ReleasesPage() {
  const releases = getReleases().filter((release) => release.path !== "index");
  const intro = getReleases().find((release) => release.path === "index");
  const latest = getLatestRelease();
  const previous = releases.filter((release) => release.path !== latest?.path);

  return (
    <Box display="flex" flexDirection="column" gap="l">
      <Box display="flex" flexDirection="column" gap="s" pb="m" borderBottom="1px solid" borderColor="palette.neutrals.3">
        <Text as="h1" fontSize="xxxl" fontWeight="700" m="0">
          Releases
        </Text>
        <Text as="p" fontSize="m" color="secondary" m="0">
          Release notes, highlights, and upgrade context for Reactberry.
        </Text>
      </Box>

      {intro ? <MdxContent code={intro.body} contentKind="releases" sourcePath={intro.sourcePath} suppressFirstH1 /> : null}

      {latest ? (
        <Box p="l" skin="surface" shape="rounded" display="flex" flexDirection="column" gap="m">
          <Box display="flex" flexDirection="column" gap="xs">
            <Text as="p" fontSize="xs" color="tertiary" textTransform="uppercase" m="0">
              Latest Release
            </Text>
            <Text as="h2" fontSize="xxl" fontWeight="700" m="0">
              {latest.version}
            </Text>
            <Text as="p" fontSize="m" color="secondary" m="0">
              {latest.title}
            </Text>
            {latest.description ? (
              <Text as="p" fontSize="s" color="secondary" m="0">
                {latest.description}
              </Text>
            ) : null}
            <Box display="flex" gap="xs" flexWrap="wrap">
              {latest.date ? (
                <Text as="p" fontSize="xs" color="tertiary" m="0">
                  {latest.date}
                </Text>
              ) : null}
              {latest.breaking ? (
                <Text as="p" fontSize="xs" color="primary" m="0">
                  Breaking changes included
                </Text>
              ) : null}
            </Box>
          </Box>
          <Box>
            <DocsNavLink href={latest.href} label="Read release notes" />
          </Box>
        </Box>
      ) : null}

      <Box display="flex" flexDirection="column" gap="m">
        <Text as="h2" fontSize="xl" fontWeight="700" m="0">
          Previous releases
        </Text>
        {previous.length ? (
          <Box display="grid" gridTemplateColumns={["1fr", "1fr 1fr"]} gap="m">
            {previous.map((release) => (
              <Box key={release.path} p="m" skin="surface" shape="rounded" display="flex" flexDirection="column" gap="s">
                <Box display="flex" flexDirection="column" gap="xs">
                  <Text as="p" fontSize="xs" color="tertiary" textTransform="uppercase" m="0">
                    {release.version}
                  </Text>
                  <Text as="h3" fontSize="l" fontWeight="700" m="0">
                    {release.title}
                  </Text>
                  {release.description ? (
                    <Text as="p" fontSize="s" color="secondary" m="0">
                      {release.description}
                    </Text>
                  ) : null}
                  {release.date ? (
                    <Text as="p" fontSize="xs" color="tertiary" m="0">
                      {release.date}
                    </Text>
                  ) : null}
                </Box>
                <Box>
                  <DocsNavLink href={release.href} label="Open release" />
                </Box>
              </Box>
            ))}
          </Box>
        ) : (
          <Box p="m" skin="surface" shape="rounded">
            <Text as="p" fontSize="s" color="secondary" m="0">
              Add more release entries in `docs/content/releases` over time.
            </Text>
          </Box>
        )}
      </Box>
    </Box>
  );
}
