export type TocItem = {
  title: string;
  url: string;
  items?: TocItem[];
};

export type TableOfContents = {
  items: TocItem[];
};

const stripInlineMarkdown = (value: string) =>
  value
    .replace(/\[([^\]]+)\]\([^)]*\)/gu, "$1")
    .replace(/`([^`]*)`/gu, "$1")
    .replace(/[*_~]/gu, "")
    .replace(/<[^>]+>/gu, "")
    .trim();

export const slugifyHeading = (value: string) =>
  stripInlineMarkdown(value)
    .toLowerCase()
    .replace(/&[a-z0-9#]+;/giu, "")
    .replace(/[^a-z0-9 -]/gu, "")
    .trim()
    .replace(/\s+/gu, "-")
    .replace(/-+/gu, "-");

export const getTableOfContents = (content: string): TableOfContents => {
  const items: TocItem[] = [];
  let currentSection: TocItem | null = null;
  let inCodeFence = false;

  for (const rawLine of content.split("\n")) {
    const line = rawLine.trim();

    if (line.startsWith("```")) {
      inCodeFence = !inCodeFence;
      continue;
    }

    if (inCodeFence) {
      continue;
    }

    const match = line.match(/^(##|###)\s+(.+)$/u);
    if (!match) {
      continue;
    }

    const depth = match[1].length;
    const title = stripInlineMarkdown(match[2]);
    if (!title) {
      continue;
    }

    const item: TocItem = { title, url: `#${slugifyHeading(title)}` };

    if (depth === 2) {
      items.push(item);
      currentSection = item;
      continue;
    }

    if (!currentSection) {
      items.push(item);
      currentSection = item;
      continue;
    }

    currentSection.items = [...(currentSection.items ?? []), item];
  }

  return { items };
};