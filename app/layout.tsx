import type { Metadata } from "next";
import ThemeProvider from "@/components/theme/ThemeProvider";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `DevPortfolio | ${SITE_NAME}`,
    template: `%s | ${SITE_NAME}`
  },
  description:
    "Justin's personal portfolio and blog - engineering notes, AI learning, and project retrospectives.",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: `DevPortfolio | ${SITE_NAME}`,
    description:
      "Justin's personal portfolio and blog - engineering notes, AI learning, and project retrospectives."
  },
  twitter: {
    card: "summary_large_image",
    title: `DevPortfolio | ${SITE_NAME}`,
    description:
      "Justin's personal portfolio and blog - engineering notes, AI learning, and project retrospectives."
  },
  alternates: {
    types: {
      "application/rss+xml": `${SITE_URL}/rss.xml`
    }
  }
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800&family=Geist:wght@400;500;600&family=JetBrains+Mono:wght@500&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="text-body-md">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
