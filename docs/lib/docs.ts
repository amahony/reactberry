import { allDocsPages } from "content-collections";

type CollectionValue<T> = T[] | (() => T[]);

export type DocsPage = {
  _meta: { path: string; directory: string; fileName: string };
  title: string;
  description?: string;
  body: string;
  section: string;
  slug: string[];
};

const sectionOrder: Record<string, number> = {
  overview: 0,
  guides: 1,
  api: 2,
  blocks: 3,
  examples: 4,
  reference: 5,
};

const resolveCollection = <T,>(value: CollectionValue<T>): T[] =>
  typeof value === "function" ? value() : value;

const humanize = (value: string) =>
  value.replace(/[-_]/gu, " ").replace(/\b\w/gu, (char) => char.toUpperCase());

export const toDocsHref = (path: string) => (path === "index" ? "/docs" : `/docs/${path}`);

export const getDocsPages = (): DocsPage[] =>
  resolveCollection(allDocsPages as CollectionValue<DocsPage>)
    .slice()
    .sort((left, right) => {
      const orderDelta = (sectionOrder[left.section] ?? 999) - (sectionOrder[right.section] ?? 999);
      return orderDelta || left.title.localeCompare(right.title);
    });

export const getDocsPage = (path: string) =>
  getDocsPages().find((page) => page._meta.path === path);

export const getDocsSections = () => {
  const grouped = new Map<string, DocsPage[]>();

  for (const page of getDocsPages()) {
    const bucket = grouped.get(page.section) ?? [];
    bucket.push(page);
    grouped.set(page.section, bucket);
  }

  return Array.from(grouped.entries()).map(([key, pages]) => ({
    key,
    title: key === "overview" ? "Overview" : humanize(key),
    pages,
  }));
};