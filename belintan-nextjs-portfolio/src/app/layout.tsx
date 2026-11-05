import type { Metadata } from "next";
import { Inter, Space_Grotesk, Grand_Hotel } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-space-grotesk" });
const grandHotel = Grand_Hotel({ weight: "400", subsets: ["latin"], variable: "--font-grand-hotel" });

export const metadata: Metadata = {
  title: "Belintan - Full-Stack Web Developer",
  description: "Building Exceptional Digital Experiences",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} ${spaceGrotesk.variable} ${grandHotel.variable} antialiased font-sans relative`}>
        {children}
      </body>
    </html>
  );
}
