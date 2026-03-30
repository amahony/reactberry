"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMDXComponent } from "@content-collections/mdx/react";
import { Box, Button, Text } from "reactberry/elements";

type MdxContentProps = {
  code: string;
};

const isExternalHref = (href: string) => /^(https?:|mailto:|tel:)/iu.test(href);

function resolveHref(href: string, pathname: string) {
  if (!href || href.startsWith("#") || href.startsWith("/")) {
    return href;
  }

  const resolved = new URL(href, `https://reactberry.dev${pathname}`);
  return `${resolved.pathname.replace(/\.(md|mdx)$/iu, "")}${resolved.hash}`;
}

function MdxLink({ href = "", children }: { href?: string; children: React.ReactNode }) {
  const pathname = usePathname();

  if (!href || href.startsWith("#") || isExternalHref(href)) {
    return (
      <Text as="a" href={href} color="primary" textDecoration="underline">
        {children}
      </Text>
    );
  }

  return (
    <Text as={Link} href={resolveHref(href, pathname)} color="primary" textDecoration="underline">
      {children}
    </Text>
  );
}

function MdxButton({ href, children, ...props }: { href?: string; children: React.ReactNode; [key: string]: any }) {
  const pathname = usePathname();

  if (!href) {
    return <Button {...props}>{children}</Button>;
  }

  if (isExternalHref(href)) {
    return (
      <Button as="a" href={href} {...props}>
        {children}
      </Button>
    );
  }

  return (
    <Button as={Link} href={resolveHref(href, pathname)} {...props}>
      {children}
    </Button>
  );
}

function MdxImage({ alt, props, ...rest }: { alt?: string; props?: Record<string, any>; [key: string]: any }) {
  const imageProps = props ? { ...props, ...rest, alt: alt ?? props.alt ?? "" } : { ...rest, alt: alt ?? "" };

  return <Image {...(imageProps as React.ComponentProps<typeof Image>)} />;
}

const components = {
  Image: MdxImage,
  Box: ({ children, ...props }: { children: React.ReactNode; [key: string]: any }) => <Box {...props}>{children}</Box>,
  Text: ({ children, ...props }: { children: React.ReactNode; [key: string]: any }) => <Text {...props}>{children}</Text>,
  Button: MdxButton,
  h1: (props: any) => <Text as="h1" fontSize="xxxl" fontWeight="700" m="0" {...props} />,
  h2: (props: any) => <Text as="h2" fontSize="xxl" fontWeight="700" mt="l" mb="s" {...props} />,
  h3: (props: any) => <Text as="h3" fontSize="xl" fontWeight="700" mt="m" mb="xs" {...props} />,
  p: ({ children, ...props }: { children: React.ReactNode; [key: string]: any }) => (
    <Text as="p" fontSize="m" color="secondary" lineHeight="1.7" m="0" {...props}>
      {children}
    </Text>
  ),
  ul: (props: any) => <Box as="ul" pl="l" m="0" display="flex" flexDirection="column" gap="xs" {...props} />,
  ol: (props: any) => <Box as="ol" pl="l" m="0" display="flex" flexDirection="column" gap="xs" {...props} />,
  li: (props: any) => <Text as="li" fontSize="m" color="secondary" lineHeight="1.7" {...props} />,
  a: MdxLink,
  blockquote: (props: any) => <Box as="blockquote" p="m" skin="surface" shape="rounded" m="0" {...props} />,
  pre: (props: any) => <Box as="pre" p="m" skin="surface" shape="rounded" overflowX="auto" m="0" {...props} />,
  code: (props: any) => <Text as="code" fontSize="s" {...props} />,
  hr: (props: any) => <Box as="hr" border="0" borderTop="1px solid" my="l" {...props} />,
};

export default function MdxContent({ code }: MdxContentProps) {
  const Component = useMDXComponent(code);

  return (
    <Box display="flex" flexDirection="column" gap="m">
      <Component components={components} />
    </Box>
  );
}