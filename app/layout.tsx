import { HeroUIProvider } from "@heroui/react";
import type { Metadata } from "next";
import { DM_Sans, Instrument_Serif } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";

const serifFont = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-serif",
});

const sansFont = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Slate",
  description: "Colorful organization for your brilliant thoughts.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${serifFont.variable} ${sansFont.variable}`}>
      <body>
        <Toaster richColors position="top-right" />
        <HeroUIProvider>{children}</HeroUIProvider>
      </body>
    </html>
  );
}
