import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Box, Text } from "reactberry/elements";

import MdxContent from "@/components/mdx-content";
import Toc from "@/components/toc";
import { getGuide, getGuides } from "@/lib/docs";
import { getTableOfContents } from "@/lib/toc";

type GuidePageProps = {
  params: Promise<{ slug: string[] }>;
};

export async function generateStaticParams() {
  return getGuides()
    .filter((guide) => guide.path !== "index")
    .map((guide) => ({ slug: guide.slug }));
}

export async function generateMetadata({ params }: GuidePageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = getGuide(slug.join("/"));
  return { title: page ? `${page.title} · Guides · Reactberry Docs` : "Guides · Reactberry Docs" };
}

export default async function GuidePage({ params }: GuidePageProps) {
  const { slug } = await params;
  const page = getGuide(slug.join("/"));

  if (!page || page.path === "index") {
    notFound();
  }

  const toc = getTableOfContents(Buffer.from(page.rawContent, "base64").toString("utf8"));

  return (
    <Box display="grid" gridTemplateColumns={["1fr", "minmax(0, 1fr)", "minmax(0, 1fr) 240px"]} gap="l" alignItems="start">
      <Box display="flex" flexDirection="column" gap="l" minWidth="0">
        <Box display="flex" flexDirection="column" gap="s" pb="m" borderBottom="1px solid" borderColor="palette.neutrals.3">
          <Text as="p" fontSize="xs" color="tertiary" textTransform="uppercase" m="0">
            Guide
          </Text>
          <Text as="h1" fontSize="xxxl" fontWeight="700" m="0">
            {page.title}
          </Text>
          {page.description ? (
            <Text as="p" fontSize="m" color="secondary" m="0">
              {page.description}
            </Text>
          ) : null}
          {page.date ? (
            <Text as="p" fontSize="xs" color="tertiary" m="0">
              {page.date}
            </Text>
          ) : null}
        </Box>
        <MdxContent code={page.body} contentKind="guides" sourcePath={page.sourcePath} />
      </Box>
      <Box as="aside" display={["none", "none", "block"]} position="sticky" top="88px">
        <Toc toc={toc} />
      </Box>
    </Box>
  );
}