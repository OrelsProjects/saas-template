import type { Metadata } from "next";
import ContentProvider from "../providers/ContentProvider";
import AuthProvider from "../providers/AuthProvider";
import PaymentProvider from "../providers/PaymentProvider";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function ContentLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthProvider>
      <ContentProvider>
        <PaymentProvider>{children}</PaymentProvider>
      </ContentProvider>
    </AuthProvider>
  );
}
