import { Box, Text } from "reactberry/elements";

import MainNav from "@/components/main-nav";
import { docsConfig } from "@/config/docs";

export default function DocsAppLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <Box minHeight="100vh" skin="base">
      <MainNav />
      <Box maxWidth="1440px" mx="auto" px={["m", "l"]} py="l" display="flex" flexDirection="column" gap="l">
        <Box display="flex" flexDirection="column" gap="xs">
          <Text as="p" fontSize="s" color="secondary" m="0">
            {docsConfig.siteTitle}
          </Text>
          <Text as="p" fontSize="m" color="tertiary" m="0">
            {docsConfig.siteDescription}
          </Text>
        </Box>
        {children}
      </Box>
    </Box>
  );
}