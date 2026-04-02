import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Box, Text } from "@reactberry/system/elements";

import MdxContent from "@/components/mdx-content";
import Toc from "@/components/toc";
import { getRelease, getReleases } from "@/lib/docs";
import { getTableOfContents } from "@/lib/toc";

type ReleasePageProps = {
  params: Promise<{ slug: string[] }>;
};

export async function generateStaticParams() {
  return getReleases()
    .filter((release) => release.path !== "index")
    .map((release) => ({ slug: release.slug }));
}

export async function generateMetadata({ params }: ReleasePageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = getRelease(slug.join("/"));
  return { title: page ? `${page.version} · Releases · Reactberry Docs` : "Releases · Reactberry Docs" };
}

export default async function ReleasePage({ params }: ReleasePageProps) {
  const { slug } = await params;
  const page = getRelease(slug.join("/"));

  if (!page || page.path === "index") {
    notFound();
  }

  const toc = getTableOfContents(Buffer.from(page.rawContent, "base64").toString("utf8"));

  return (
    <Box display="grid" gridTemplateColumns={["1fr", "minmax(0, 1fr)", "minmax(0, 1fr) 240px"]} gap="l" alignItems="start">
      <Box display="flex" flexDirection="column" gap="l" minWidth="0">
        <Box display="flex" flexDirection="column" gap="s" pb="m" borderBottom="1px solid" borderColor="palette.neutrals.3">
          <Text as="p" fontSize="xs" color="tertiary" textTransform="uppercase" m="0">
            Release
          </Text>
          <Text as="h1" fontSize="xxxl" fontWeight="700" m="0">
            {page.version}
          </Text>
          {page.title !== page.version ? (
            <Text as="p" fontSize="m" color="secondary" m="0">
              {page.title}
            </Text>
          ) : null}
          {page.description ? (
            <Text as="p" fontSize="m" color="secondary" m="0">
              {page.description}
            </Text>
          ) : null}
          <Box display="flex" gap="xs" flexWrap="wrap">
            {page.date ? (
              <Text as="p" fontSize="xs" color="tertiary" m="0">
                {page.date}
              </Text>
            ) : null}
            {page.breaking ? (
              <Text as="p" fontSize="xs" color="primary" m="0">
                Breaking changes included
              </Text>
            ) : null}
          </Box>
        </Box>
        <MdxContent code={page.body} contentKind="releases" sourcePath={page.sourcePath} suppressFirstH1 />
      </Box>
      <Box as="aside" display={["none", "none", "block"]} position="sticky" top="88px">
        <Toc toc={toc} />
      </Box>
    </Box>
  );
}
