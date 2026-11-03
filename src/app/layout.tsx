import type { Metadata, Viewport } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";

const mono = JetBrains_Mono({ variable: "--font-jetbrains-mono", subsets: ["latin"], weight: ["400", "500"] });

export const metadata: Metadata = {
  title: "omi: every step, judged",
  description:
    "A small model that watches your coding agent and flags the actions that don't belong. p(side task) per action, one forward pass, local.",
  openGraph: {
    title: "omi: every step, judged",
    description: "A small model that watches your coding agent and flags the actions that don't belong.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#fafaf8",
  colorScheme: "light",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${mono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
