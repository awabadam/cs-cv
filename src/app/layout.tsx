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

/* Apply a pinned light/dark choice (ThemeSwitch) before first paint, so it never flashes. */
const themeInit = `try{var t=localStorage.getItem("theme");if(t==="light"||t==="dark")document.documentElement.dataset.theme=t}catch(e){}`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // The script sets data-theme before React hydrates, hence suppressHydrationWarning.
    <html lang="en" className={`${switzer.variable} antialiased`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInit }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
