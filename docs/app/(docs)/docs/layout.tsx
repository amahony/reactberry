import { Box } from "reactberry/elements";

import SidebarNav from "@/components/sidebar-nav";

export default function DocumentationLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <Box display="grid" gridTemplateColumns={["1fr", "280px minmax(0, 1fr)"]} gap="l" alignItems="start">
      <Box as="aside" display={["none", "block"]} position="sticky" top="88px">
        <SidebarNav />
      </Box>
      <Box minWidth="0">{children}</Box>
    </Box>
  );
}