import "./globals.css";
import type { Metadata } from "next";
import { ConditionalChrome } from "@/components/site/ConditionalChrome";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { baseMetadata } from "@/lib/metadata";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  return baseMetadata();
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ConditionalChrome header={<Header />} footer={<Footer />}>
          {children}
        </ConditionalChrome>
      </body>
    </html>
  );
}
