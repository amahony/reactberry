import DocsShell from "@/components/docs-shell";

export default function DocumentationLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <DocsShell>{children}</DocsShell>;
}