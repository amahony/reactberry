import { defineCollection, defineConfig } from "@content-collections/core";
import { compileMDX } from "@content-collections/mdx";
import { z } from "zod";

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

const docsPageSchema = z
  .object({
    content: z.string(),
    title: z.string().optional(),
    description: z.string().optional(),
  })
  .passthrough();

const docsPages = defineCollection({
  name: "docsPages",
  directory: "../src/design-system/docs",
  include: "**/*.md",
  schema: docsPageSchema,
  transform: async (document, context) => {
    const body = await compileMDX(context, document);
    const section = document._meta.directory.split("/")[0] || "overview";

    return {
      ...document,
      body,
      slug: document._meta.path.split("/"),
      section,
      title: document.title || extractTitle(document.content, humanize(document._meta.fileName)),
      description: document.description || extractDescription(document.content),
    };
  },
});

export default defineConfig({
  content: [docsPages],
});