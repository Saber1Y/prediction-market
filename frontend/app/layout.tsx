import type { Metadata } from "next";
import { Sora } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { PrivyWalletProvider } from "@/providers/PrivyProvider";

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Log Protocol - Prediction Market",
  description: "Decentralized prediction market powered by LMSR",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${sora.variable} antialiased  font-sora`}>
        <PrivyWalletProvider>
          <Navbar />
          <main className="min-h-screen">{children}</main>
        </PrivyWalletProvider>
      </body>
    </html>
  );
}
