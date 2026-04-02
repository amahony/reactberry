import { Box } from "@reactberry/system/elements";

export default function ReleasesLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <Box minWidth="0">{children}</Box>;
}
