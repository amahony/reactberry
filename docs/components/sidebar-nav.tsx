import { Box, Text } from "reactberry/elements";

import DocsNavLink from "@/components/docs-nav-link";
import { getDocsSections } from "@/lib/docs";

export default function SidebarNav() {
  const sections = getDocsSections();

  return (
    <Box as="nav" aria-label="Documentation navigation" display="flex" flexDirection="column" gap="m">
      {sections.map((section) => (
        <Box key={section.key} display="flex" flexDirection="column" gap="xs">
          <Text as="p" fontSize="xs" fontWeight="700" color="tertiary" textTransform="uppercase" m="0">
            {section.title}
          </Text>
          <Box display="flex" flexDirection="column" gap="mini">
            {section.pages.map((page) => (
              <DocsNavLink key={page.path} href={page.href} label={page.navTitle || page.title} />
            ))}
          </Box>
        </Box>
      ))}
    </Box>
  );
}