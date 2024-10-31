import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home",
};

export default function ContentLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
