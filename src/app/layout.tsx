import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "OMINIS: runtime safety for coding agents",
  description:
    "OMINIS watches every action an AI coding agent takes. Its judge, Omi, returns a calibrated probability that the action belongs to an undeclared side task, locally, in one forward pass.",
  openGraph: {
    title: "OMINIS: runtime safety for coding agents",
    description: "A small, calibrated, local monitor for AI coding agents. Looking for design partners.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0b0d",
  colorScheme: "dark",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
