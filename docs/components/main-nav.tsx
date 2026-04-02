"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Box, Text } from "@reactberry/system/elements";

import { docsConfig } from "@/config/docs";
import ThemeToggle from "@/components/theme-toggle";

export default function MainNav() {
    const pathname = usePathname();

    return (
        <Box as="header" position="sticky" top="0" zIndex="10" borderBottom="1px solid" skin="translucent">
            <Box maxWidth="1440px" mx="auto" px={["m", "l"]} py="s" display="flex" alignItems="center" gap="m">
                <Text as={Link} href="/" fontSize="m" fontWeight="700">
                    Reactberry
                </Text>
                <Text as="span" fontSize="s" color="tertiary">
                    {docsConfig.siteTitle}
                </Text>
                <Box as="nav" ml="auto" display="flex" alignItems="center" gap="xs">
                    <ThemeToggle />
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
