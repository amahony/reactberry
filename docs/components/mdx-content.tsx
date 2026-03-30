"use client";

import { Children, isValidElement } from "react";
import Image from "next/image";
import Link from "next/link";
import { useMDXComponent } from "@content-collections/mdx/react";
import { Box, Button, Text } from "reactberry/elements";

import { slugifyHeading } from "@/lib/toc";

type MdxContentProps = {
  code: string;
  contentKind: "docs" | "guides";
  sourcePath: string;
};

const isExternalHref = (href: string) => /^(https?:|mailto:|tel:)/iu.test(href);

const flattenText = (value: React.ReactNode): string =>
  Children.toArray(value)
    .map((child) => {
      if (typeof child === "string" || typeof child === "number") {
        return String(child);
      }

      if (isValidElement<{ children?: React.ReactNode }>(child)) {
        return flattenText(child.props.children);
      }

      return "";
    })
    .join("");

const normalizeContentPath = (path: string) =>
  path.replace(/^\/content\//u, "").replace(/\.(md|mdx)$/iu, "").replace(/\/index$/iu, "").replace(/\/$/u, "");

function resolveHref(href: string, contentKind: "docs" | "guides", sourcePath: string) {
  if (!href || href.startsWith("#") || href.startsWith("/")) {
    return href;
  }

  const resolved = new URL(href, `https://reactberry.dev/content/${contentKind}/${sourcePath}`);
  const normalizedPath = normalizeContentPath(resolved.pathname);

  if (normalizedPath === "guides" || normalizedPath.startsWith("guides/")) {
    const target = normalizedPath.replace(/^guides\/?/u, "");
    return `${target ? `/guides/${target}` : "/guides"}${resolved.hash}`;
  }

  if (normalizedPath === "docs/guides" || normalizedPath.startsWith("docs/guides/")) {
    const target = normalizedPath.replace(/^docs\/guides\/?/u, "");
    return `${target ? `/guides/${target}` : "/guides"}${resolved.hash}`;
  }

  if (normalizedPath === "docs" || normalizedPath.startsWith("docs/")) {
    const target = normalizedPath.replace(/^docs\/?/u, "");
    return `${target ? `/docs/${target}` : "/docs"}${resolved.hash}`;
  }

  return `${normalizedPath ? `/docs/${normalizedPath}` : "/docs"}${resolved.hash}`;
}

function MdxLink({
  href = "",
  children,
  contentKind,
  sourcePath,
}: {
  href?: string;
  children: React.ReactNode;
  contentKind: "docs" | "guides";
  sourcePath: string;
}) {

  if (!href || href.startsWith("#") || isExternalHref(href)) {
    return (
      <Text as="a" href={href} color="primary" textDecoration="underline">
        {children}
      </Text>
    );
  }

  return (
    <Text as={Link} href={resolveHref(href, contentKind, sourcePath)} color="primary" textDecoration="underline">
      {children}
    </Text>
  );
}

function MdxButton({
  href,
  children,
  contentKind,
  sourcePath,
  ...props
}: {
  href?: string;
  children: React.ReactNode;
  contentKind: "docs" | "guides";
  sourcePath: string;
  [key: string]: any;
}) {

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
    <Button as={Link} href={resolveHref(href, contentKind, sourcePath)} {...props}>
      {children}
    </Button>
  );
}

function MdxImage({ alt, props, ...rest }: { alt?: string; props?: Record<string, any>; [key: string]: any }) {
  const imageProps = props ? { ...props, ...rest, alt: alt ?? props.alt ?? "" } : { ...rest, alt: alt ?? "" };

  if (!("src" in imageProps) || !imageProps.src) {
    return null;
  }

  return <Image {...(imageProps as React.ComponentProps<typeof Image>)} />;
}

export default function MdxContent({ code, contentKind, sourcePath }: MdxContentProps) {
  const Component = useMDXComponent(code);
  const components = {
    Image: MdxImage,
    Box: ({ children, ...props }: { children: React.ReactNode; [key: string]: any }) => <Box {...props}>{children}</Box>,
    Text: ({ children, ...props }: { children: React.ReactNode; [key: string]: any }) => <Text {...props}>{children}</Text>,
    Button: (props: any) => <MdxButton contentKind={contentKind} sourcePath={sourcePath} {...props} />,
    h1: ({ children, ...props }: { children: React.ReactNode; [key: string]: any }) => (
      <Text as="h1" id={props.id ?? slugifyHeading(flattenText(children))} fontSize="xxxl" fontWeight="700" m="0" {...props}>
        {children}
      </Text>
    ),
    h2: ({ children, ...props }: { children: React.ReactNode; [key: string]: any }) => (
      <Text as="h2" id={props.id ?? slugifyHeading(flattenText(children))} fontSize="xxl" fontWeight="700" mt="l" mb="s" {...props}>
        {children}
      </Text>
    ),
    h3: ({ children, ...props }: { children: React.ReactNode; [key: string]: any }) => (
      <Text as="h3" id={props.id ?? slugifyHeading(flattenText(children))} fontSize="xl" fontWeight="700" mt="m" mb="xs" {...props}>
        {children}
      </Text>
    ),
    h4: (props: any) => <Text as="h4" fontSize="l" fontWeight="700" mt="m" mb="xs" {...props} />,
    p: ({ children, ...props }: { children: React.ReactNode; [key: string]: any }) => (
      <Text as="p" fontSize="m" color="secondary" lineHeight="1.7" m="0" {...props}>
        {children}
      </Text>
    ),
    ul: (props: any) => <Box as="ul" pl="l" m="0" display="flex" flexDirection="column" gap="xs" {...props} />,
    ol: (props: any) => <Box as="ol" pl="l" m="0" display="flex" flexDirection="column" gap="xs" {...props} />,
    li: (props: any) => <Text as="li" fontSize="m" color="secondary" lineHeight="1.7" {...props} />,
    a: (props: any) => <MdxLink contentKind={contentKind} sourcePath={sourcePath} {...props} />,
    blockquote: (props: any) => <Box as="blockquote" p="m" skin="surface" shape="rounded" m="0" {...props} />,
    pre: (props: any) => <Box as="pre" p="m" skin="surface" shape="rounded" overflowX="auto" m="0" {...props} />,
    code: (props: any) => <Text as="code" fontSize="s" {...props} />,
    hr: (props: any) => <Box as="hr" border="0" borderTop="1px solid" my="l" {...props} />,
  };

  return (
    <Box display="flex" flexDirection="column" gap="m">
      <Component components={components} />
    </Box>
  );
}