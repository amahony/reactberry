import { allDocs, allGuides } from "content-collections";

import { getDocsSectionMeta } from "@/config/docs";

type CollectionValue<T> = T[] | (() => T[]);

type BasePage = {
  _meta: { path: string; directory: string; fileName: string };
  kind: "docs" | "guides";
  title: string;
  navTitle?: string;
  description?: string;
  body: string;
  rawContent: string;
  sourcePath: string;
  path: string;
  href: string;
  published: boolean;
  order: number;
  slug: string[];
};

export type DocsPage = BasePage & {
  kind: "docs";
  section: string;
};

export type GuidePage = BasePage & {
  kind: "guides";
  featured: boolean;
  date?: string;
};

const resolveCollection = <T,>(value: CollectionValue<T>): T[] =>
  typeof value === "function" ? value() : value;

const compareText = (left: string, right: string) => left.localeCompare(right);

const toTime = (value?: string) => {
  if (!value) {
    return 0;
  }

  const parsed = Date.parse(value);
  return Number.isNaN(parsed) ? 0 : parsed;
};

export const toDocsHref = (path: string) => (path === "index" ? "/docs" : `/docs/${path}`);
export const toGuideHref = (path: string) => (path === "index" ? "/guides" : `/guides/${path}`);

export const getDocsPages = (): DocsPage[] =>
  resolveCollection(allDocs as CollectionValue<DocsPage>)
    .filter((page) => page.published)
    .slice()
    .sort((left, right) => {
      const sectionDelta = getDocsSectionMeta(left.section).order - getDocsSectionMeta(right.section).order;
      return sectionDelta || left.order - right.order || compareText(left.title, right.title);
    });

export const getDocsPage = (path: string) =>
  getDocsPages().find((page) => page.path === path || page.sourcePath === path);

export const getGuides = (): GuidePage[] =>
  resolveCollection(allGuides as CollectionValue<GuidePage>)
    .filter((page) => page.published)
    .slice()
    .sort((left, right) => {
      if (left.featured !== right.featured) {
        return left.featured ? -1 : 1;
      }

      const dateDelta = toTime(right.date) - toTime(left.date);
      return dateDelta || left.order - right.order || compareText(left.title, right.title);
    });

export const getGuide = (path: string) => getGuides().find((page) => page.path === path || page.sourcePath === path);

export const getDocsSections = () => {
  const grouped = new Map<string, DocsPage[]>();

  for (const page of getDocsPages()) {
    const bucket = grouped.get(page.section) ?? [];
    bucket.push(page);
    grouped.set(page.section, bucket);
  }

  return Array.from(grouped.entries())
    .map(([key, pages]) => ({
      key,
      title: getDocsSectionMeta(key).title,
      order: getDocsSectionMeta(key).order,
      pages,
    }))
    .sort((left, right) => left.order - right.order || compareText(left.title, right.title));
};