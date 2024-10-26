import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import StoreProvider from "./providers/StoreProvider";
import SessionWrapper from "./providers/SessionWrapper";
import AuthProvider from "./providers/AuthProvider";
import { cn } from "../lib/utils";
import { PoppinsFont } from "../lib/utils/fontUtils";
import UnautenticatedProvider from "./providers/UnautenticatedProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(inter.className, "h-dvh w-screen")}>
        <StoreProvider>
          <SessionWrapper>
            <AuthProvider>
              <UnautenticatedProvider>{children}</UnautenticatedProvider>
            </AuthProvider>
          </SessionWrapper>
        </StoreProvider>
      </body>
    </html>
  );
}
