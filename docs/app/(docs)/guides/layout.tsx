import { Box } from "reactberry/elements";

export default function GuidesLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <Box minWidth="0">{children}</Box>;
}