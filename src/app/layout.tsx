import type { Metadata } from "next";
import { Fraunces, Manrope } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  style: ["normal", "italic"],
  axes: ["SOFT", "WONK", "opsz"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.cmoretravels.in"),
  title: {
    default: "C More Travel & Tours | Incoming tours from New Delhi",
    template: "%s | C More Travel & Tours",
  },
  description:
    "Incoming tour operator in Green Park, New Delhi. Private journeys across India since 1991 — heritage circuits, family travel, pilgrimage, and MICE.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${manrope.variable} ${fraunces.variable} h-full`}>
      <body className="min-h-full bg-mist text-foreground antialiased">{children}</body>
    </html>
  );
}
