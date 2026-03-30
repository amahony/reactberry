import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Box, Text } from "reactberry/elements";

import MdxContent from "@/components/mdx-content";
import { getDocsPage, getDocsPages } from "@/lib/docs";

type DocsPageProps = {
  params: Promise<{ slug?: string[] }>;
};

const resolvePath = (slug?: string[]) => (slug?.length ? slug.join("/") : "index");

export async function generateStaticParams() {
  return getDocsPages()
    .filter((page) => page._meta.path !== "index")
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

  return (
    <Box display="flex" flexDirection="column" gap="m">
      <Text as="p" fontSize="xs" color="tertiary" textTransform="uppercase" m="0">
        {page.section}
      </Text>
      {page.description ? (
        <Text as="p" fontSize="s" color="secondary" m="0">
          {page.description}
        </Text>
      ) : null}
      <MdxContent code={page.body} />
    </Box>
  );
}