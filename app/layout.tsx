import type { Metadata } from "next";
import "./globals.scss";

export const metadata: Metadata = {
  title: "TheCracker | Premium Brand Studio",
  description: "당신의 브랜드를 새롭게 크랙하다.",
  openGraph: {
    title: "TheCracker | Premium Brand Studio",
    description: "당신의 브랜드를 새롭게 크랙하다.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
