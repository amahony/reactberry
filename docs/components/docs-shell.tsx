import { PropsWithChildren } from "react";
import Link from "next/link";
import { Box, Text } from "reactberry/elements";

import DocsSidebar from "@/components/docs-sidebar";

export default function DocsShell({ children }: PropsWithChildren) {
  return (
    <Box minHeight="100vh" skin="base">
      <Box as="header" borderBottom="1px solid" p="m">
        <Box maxWidth="1280px" mx="auto" display="flex" flexDirection="column" gap="xs">
          <Link href="/">
            <Text as="span" fontSize="s" color="secondary">
              Reactberry
            </Text>
          </Link>
          <Text as="h1" fontSize="xl" fontWeight="700" m="0">
            Documentation
          </Text>
          <Text as="p" fontSize="s" color="secondary" m="0">
            Powered by the same design system package used by consumers.
          </Text>
        </Box>
      </Box>

      <Box
        maxWidth="1280px"
        mx="auto"
        display="grid"
        gridTemplateColumns={["1fr", "280px 1fr"]}
        gap="l"
        p="m"
      >
        <Box as="aside" display="flex" flexDirection="column" gap="m">
          <DocsSidebar />
        </Box>
        <Box as="main" minWidth="0">
          {children}
        </Box>
      </Box>
    </Box>
  );
}