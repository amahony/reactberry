import { defineCollection, defineConfig } from "@content-collections/core";
import { compileMDX } from "@content-collections/mdx";
import { z } from "zod";

const includePattern = "**/*.md*";

const humanize = (value: string) =>
  value
    .replace(/\.[^.]+$/u, "")
    .replace(/[-_]/gu, " ")
    .replace(/\b\w/gu, (char) => char.toUpperCase());

const extractTitle = (content: string, fallback: string) => {
  const match = content.match(/^#\s+(.+)$/mu);
  return match?.[1]?.trim().replace(/[`*_]/gu, "") || fallback;
};

const extractDescription = (content: string) => {
  const lines = content.split("\n").map((line) => line.trim());
  const summary = lines.find(
    (line) =>
      line &&
      !line.startsWith("#") &&
      !line.startsWith("```") &&
      !line.startsWith(">") &&
      !/^[-*+]\s/u.test(line) &&
      !/^\d+\.\s/u.test(line),
  );

  return summary?.slice(0, 180);
};

const toRouteSegments = (path: string) => {
  const segments = path.split("/").filter(Boolean);
  return segments.at(-1) === "index" ? segments.slice(0, -1) : segments;
};

const toLookupPath = (path: string) => {
  const segments = toRouteSegments(path);
  return segments.join("/") || "index";
};

const toHref = (base: "docs" | "guides" | "releases", path: string) => {
  const segments = toRouteSegments(path);
  return segments.length ? `/${base}/${segments.join("/")}` : `/${base}`;
};

const basePageSchema = z
  .object({
    content: z.string(),
    title: z.string().optional(),
    description: z.string().optional(),
    navTitle: z.string().optional(),
    section: z.string().optional(),
    published: z.boolean().optional(),
    order: z.number().optional(),
  })
  .passthrough();

const docsPageSchema = basePageSchema;

const guidePageSchema = basePageSchema
  .extend({
    date: z.string().optional(),
    featured: z.boolean().optional(),
  })
  .passthrough();

const releasePageSchema = basePageSchema
  .extend({
    version: z.string().optional(),
    date: z.string().optional(),
    featured: z.boolean().optional(),
    breaking: z.boolean().optional(),
  })
  .passthrough();

const docs = defineCollection({
  name: "docs",
  directory: "./content/docs",
  include: includePattern,
  schema: docsPageSchema,
  transform: async (document, context) => {
    const body = await compileMDX(context, document);
    const routeSegments = toRouteSegments(document._meta.path);
    const section = document.section || routeSegments[0] || "overview";

    return {
      ...document,
      kind: "docs",
      body,
      rawContent: Buffer.from(document.content, "utf8").toString("base64"),
      sourcePath: document._meta.path,
      path: toLookupPath(document._meta.path),
      href: toHref("docs", document._meta.path),
      slug: routeSegments,
      section,
      navTitle: document.navTitle,
      published: document.published ?? true,
      order: document.order ?? 0,
      title: document.title || extractTitle(document.content, humanize(document._meta.fileName)),
      description: document.description || extractDescription(document.content),
    };
  },
});

const guides = defineCollection({
  name: "guides",
  directory: "./content/guides",
  include: includePattern,
  schema: guidePageSchema,
  transform: async (document, context) => {
    const body = await compileMDX(context, document);
    const routeSegments = toRouteSegments(document._meta.path);

    return {
      ...document,
      kind: "guides",
      body,
      rawContent: Buffer.from(document.content, "utf8").toString("base64"),
      sourcePath: document._meta.path,
      path: toLookupPath(document._meta.path),
      href: toHref("guides", document._meta.path),
      slug: routeSegments,
      navTitle: document.navTitle,
      published: document.published ?? true,
      order: document.order ?? 0,
      featured: document.featured ?? false,
      date: document.date,
      title: document.title || extractTitle(document.content, humanize(document._meta.fileName)),
      description: document.description || extractDescription(document.content),
    };
  },
});

const releases = defineCollection({
  name: "releases",
  directory: "./content/releases",
  include: includePattern,
  schema: releasePageSchema,
  transform: async (document, context) => {
    const body = await compileMDX(context, document);
    const routeSegments = toRouteSegments(document._meta.path);

    return {
      ...document,
      kind: "releases",
      body,
      rawContent: Buffer.from(document.content, "utf8").toString("base64"),
      sourcePath: document._meta.path,
      path: toLookupPath(document._meta.path),
      href: toHref("releases", document._meta.path),
      slug: routeSegments,
      navTitle: document.navTitle,
      published: document.published ?? true,
      order: document.order ?? 0,
      featured: document.featured ?? false,
      breaking: document.breaking ?? false,
      version: document.version || document.title || humanize(document._meta.fileName),
      date: document.date,
      title: document.title || extractTitle(document.content, humanize(document._meta.fileName)),
      description: document.description || extractDescription(document.content),
    };
  },
});

export default defineConfig({
  content: [docs, guides, releases],
});
