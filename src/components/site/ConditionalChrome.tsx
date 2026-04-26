"use client";

import { usePathname } from "next/navigation";

type ConditionalChromeProps = {
  header: React.ReactNode;
  footer: React.ReactNode;
  children: React.ReactNode;
};

export function ConditionalChrome({ header, footer, children }: ConditionalChromeProps) {
  const pathname = usePathname();
  if (pathname?.startsWith("/admin")) {
    return <>{children}</>;
  }
  return (
    <>
      {header}
      <main>{children}</main>
      {footer}
    </>
  );
}
