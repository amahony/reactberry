import type { Metadata } from "next";
import { Instrument_Sans } from "next/font/google";
import "highlight.js/styles/github.css";
import { DocsThemeProvider } from "@/components/docs-theme-provider";

const mainFont = Instrument_Sans({
  subsets: ["latin"],
  variable: "--main-font",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Reactberry Docs",
  description: "Design system documentation powered by Reactberry.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={mainFont.variable}>
        <DocsThemeProvider>{children}</DocsThemeProvider>
      </body>
    </html>
  );
}