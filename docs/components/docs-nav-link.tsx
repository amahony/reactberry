"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Box, Text } from "reactberry/elements";

type DocsNavLinkProps = {
  href: string;
  label: string;
};

export default function DocsNavLink({ href, label }: DocsNavLinkProps) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link href={href}>
      <Box
        p="xs"
        shape="roundedSmall"
        skin={isActive ? "surface" : undefined}
        hover="subtle"
      >
        <Text as="span" fontSize="s" color={isActive ? "primary" : "secondary"}>
          {label}
        </Text>
      </Box>
    </Link>
  );
}