import type { Metadata } from "next";
import { Inter, Roboto_Mono } from "next/font/google";
import "./globals.css";
import SlideNavigation from "@/components/navigation/SlideNavigation";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const mono = Roboto_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Lead Performance Dashboard",
  description: "Data-driven insights for lead management optimization",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${mono.variable} antialiased bg-gradient-to-br from-gray-50 to-gray-100`}
      >
        <div className="flex min-h-screen">
          <SlideNavigation />
          <div className="ml-64 flex-1 p-8">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
