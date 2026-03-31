export type MainNavItem = {
  title: string;
  href: string;
};

export type DocsSectionMeta = {
  title: string;
  order: number;
};

const humanize = (value: string) => value.replace(/[-_]/gu, " ").replace(/\b\w/gu, (char) => char.toUpperCase());

export const docsConfig = {
  siteTitle: "Reactberry Documentation",
  siteDescription: "A docs site powered entirely by Reactberry itself.",
  mainNav: [
    { title: "Documentation", href: "/docs" },
    { title: "Guides", href: "/guides" },
  ] satisfies MainNavItem[],
  sections: {
    overview: { title: "Overview", order: 0 },
    foundations: { title: "Foundations", order: 1 },
    elements: { title: "Elements", order: 2 },
    blocks: { title: "Blocks", order: 3 },
  } satisfies Record<string, DocsSectionMeta>,
};

export const getDocsSectionMeta = (key: string): DocsSectionMeta =>
  (docsConfig.sections as Record<string, DocsSectionMeta>)[key] ?? {
    title: humanize(key),
    order: 999,
  };