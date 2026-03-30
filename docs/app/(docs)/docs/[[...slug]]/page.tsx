import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Box, Text } from "reactberry/elements";

import MdxContent from "@/components/mdx-content";
import Toc from "@/components/toc";
import { getDocsPage, getDocsPages } from "@/lib/docs";
import { getTableOfContents } from "@/lib/toc";

type DocsPageProps = {
  params: Promise<{ slug?: string[] }>;
};

const resolvePath = (slug?: string[]) => (slug?.length ? slug.join("/") : "index");

export async function generateStaticParams() {
  return getDocsPages()
    .filter((page) => page.path !== "index")
    .map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({ params }: DocsPageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = getDocsPage(resolvePath(slug));
  return { title: page ? `${page.title} · Reactberry Docs` : "Reactberry Docs" };
}

export default async function DocumentationPage({ params }: DocsPageProps) {
  const { slug } = await params;
  const page = getDocsPage(resolvePath(slug));

  if (!page) {
    notFound();
  }

  const toc = getTableOfContents(Buffer.from(page.rawContent, "base64").toString("utf8"));

  return (
    <Box display="grid" gridTemplateColumns={["1fr", "minmax(0, 1fr)", "minmax(0, 1fr) 240px"]} gap="l" alignItems="start">
      <Box display="flex" flexDirection="column" gap="l" minWidth="0">
        <Box display="flex" flexDirection="column" gap="s" pb="m" borderBottom="1px solid" borderColor="palette.neutrals.3">
          <Text as="p" fontSize="xs" color="tertiary" textTransform="uppercase" m="0">
            {page.section}
          </Text>
          <Text as="h1" fontSize="xxxl" fontWeight="700" m="0">
            {page.title}
          </Text>
          {page.description ? (
            <Text as="p" fontSize="m" color="secondary" m="0">
              {page.description}
            </Text>
          ) : null}
        </Box>
        <MdxContent code={page.body} contentKind="docs" sourcePath={page.sourcePath} />
      </Box>
      <Box as="aside" display={["none", "none", "block"]} position="sticky" top="88px">
        <Toc toc={toc} />
      </Box>
    </Box>
  );
}