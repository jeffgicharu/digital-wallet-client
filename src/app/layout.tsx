import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ApolloProviderWrapper from "@/components/ApolloProviderWrapper";
import ThemeRegistry from "@/components/ThemeRegistry";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Digital Wallet",
  description: "M-Pesa Style Digital Wallet Application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeRegistry>
          <ApolloProviderWrapper>{children}</ApolloProviderWrapper>
        </ThemeRegistry>
      </body>
    </html>
  );
}
