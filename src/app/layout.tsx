import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const switzer = localFont({
  src: "./fonts/Switzer-Variable.woff2",
  weight: "100 900",
  variable: "--font-switzer",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://cv.awab.design"),
  title: {
    default: "Awab Elkhalil — Designer & Developer",
    template: "%s — Awab Elkhalil",
  },
  description:
    "Work and CV of Awab Elkhalil — brand identity, campaigns, websites and products, designed and built end to end. Based in Istanbul.",
  openGraph: {
    title: "Awab Elkhalil — Designer & Developer",
    description:
      "Brand identity, campaigns, websites and products — designed and built end to end.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Awab Elkhalil — Designer & Developer",
    description:
      "Brand identity, campaigns, websites and products — designed and built end to end.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${switzer.variable} antialiased`}>
      <body>{children}</body>
    </html>
  );
}
