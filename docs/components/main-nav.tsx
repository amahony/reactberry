"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Box, Text } from "reactberry/elements";

import { docsConfig } from "@/config/docs";

export default function MainNav() {
  const pathname = usePathname();

  return (
    <Box
      as="header"
      position="sticky"
      top="0"
      zIndex="10"
      skin="base"
      borderBottom="1px solid"
      borderColor="palette.neutrals.3"
    >
      <Box maxWidth="1440px" mx="auto" px={["m", "l"]} py="s" display="flex" alignItems="center" gap="m">
        <Text as={Link} href="/" fontSize="s" fontWeight="700">
          Reactberry
        </Text>
        <Text as="span" fontSize="s" color="tertiary">
          {docsConfig.siteTitle}
        </Text>
        <Box as="nav" ml="auto" display="flex" alignItems="center" gap="xs">
          {docsConfig.mainNav.map((item) => {
            const active = pathname === item.href || pathname.startsWith(`${item.href}/`);

            return (
              <Text
                key={item.href}
                as={Link}
                href={item.href}
                fontSize="s"
                fontWeight={active ? "700" : "500"}
                color={active ? "primary" : "secondary"}
                px="s"
                py="xs"
              >
                {item.title}
              </Text>
            );
          })}
        </Box>
      </Box>
    </Box>
  );
}