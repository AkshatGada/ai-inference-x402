import { Toaster } from "sonner";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import type { Metadata } from "next";

import "./globals.css";
import { StarButton } from "@/components/star-button";
import { WalletProvider } from "../lib/wallet";
import { SignInButton } from "../components/sign-in-button";

export const metadata: Metadata = {
  title: "Pay-per-Token AI Inference",
  description:
    "Pay-per-token AI inference using x402 protocol on Polygon Amoy.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <WalletProvider>
      <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
        <body>
          <div className="fixed right-0 left-0 w-full top-0 bg-white dark:bg-zinc-950 mx-auto">
            <div className="flex justify-between items-center p-4">
              <div className="flex flex-row items-center gap-2 shrink-0 ">
                <h3 className="text-xl font-bold">x402 AI Inference</h3>
              </div>
              <div className="flex flex-row items-center gap-4 shrink-0">
                <StarButton />
                <SignInButton />
              </div>
            </div>
          </div>
          <Toaster position="top-center" />
          {children}
        </body>
      </html>
    </WalletProvider>
  );
}
