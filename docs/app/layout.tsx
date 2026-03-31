import type { Metadata } from "next";
import { Instrument_Sans } from "next/font/google";
import "highlight.js/styles/github.css";
import { DesignSystemProvider } from "reactberry/providers";

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
        <DesignSystemProvider>{children}</DesignSystemProvider>
      </body>
    </html>
  );
}