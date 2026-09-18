import type { Metadata } from "next";
import "@fontsource-variable/golos-text";
import "./globals.css";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: site.title,
  description: site.description,
  openGraph: {
    title: site.title,
    description: site.description,
    locale: "ru_RU",
    type: "website",
    siteName: site.name,
  },
  twitter: {
    card: "summary",
    title: site.title,
    description: site.description,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
}
