"use client";

import { useEffect, useMemo, useState } from "react";
import { Box, Text } from "reactberry/elements";

import type { TableOfContents } from "@/lib/toc";

type TocProps = {
  toc: TableOfContents;
};

export default function Toc({ toc }: TocProps) {
  const itemIds = useMemo(
    () =>
      toc.items
        .flatMap((item) => [item.url, ...(item.items?.map((child) => child.url) ?? [])])
        .map((url) => url.replace(/^#/, "")),
    [toc],
  );
  const activeId = useActiveHeading(itemIds);

  if (!toc.items.length) {
    return null;
  }

  return (
    <Box as="aside" display="flex" flexDirection="column" gap="s">
      <Text as="h2" fontSize="xs" fontWeight="700" color="tertiary" textTransform="uppercase" m="0">
        On this page
      </Text>
      <TocTree items={toc.items} activeId={activeId} level={1} />
    </Box>
  );
}

function useActiveHeading(itemIds: string[]) {
  const [activeId, setActiveId] = useState("");

  useEffect(() => {
    if (!itemIds.length) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "0% 0% -75% 0%" },
    );

    itemIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, [itemIds]);

  return activeId;
}

function TocTree({
  items,
  activeId,
  level,
}: {
  items: TableOfContents["items"];
  activeId: string;
  level: number;
}) {
  return (
    <Box as="ul" m="0" p="0" pl={level > 1 ? "s" : "0"} display="flex" flexDirection="column" gap="xs" style={{ listStyle: "none" }}>
      {items.map((item) => {
        const active = item.url === `#${activeId}`;

        return (
          <Box as="li" key={item.url} display="flex" flexDirection="column" gap="xs">
            <Text as="a" href={item.url} fontSize="s" color={active ? "primary" : "secondary"} fontWeight={active ? "700" : "400"}>
              {item.title}
            </Text>
            {item.items?.length ? <TocTree items={item.items} activeId={activeId} level={level + 1} /> : null}
          </Box>
        );
      })}
    </Box>
  );
}