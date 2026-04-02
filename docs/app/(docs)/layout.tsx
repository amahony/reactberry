import { Box } from "@reactberry/system/elements";
import MainNav from "@/components/main-nav";

export default function DocsAppLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <Box minHeight="100vh">
            <MainNav />
            <Box maxWidth="1440px" mx="auto" px={["m", "l"]} py="l" display="flex" flexDirection="column" gap="l">
                {children}
            </Box>
        </Box>
    );
}
