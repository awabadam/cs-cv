import type { Metadata } from "next";
import "./globals.css";

const fontUrl =
  "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&family=Cormorant+SC:wght@300;400;500;600;700&family=Bodoni+Moda:ital,opsz,wght@0,6..96,400..900;1,6..96,400..900&family=Playfair+Display:wght@400..900&family=Fraunces:ital,opsz,wght,SOFT,WONK@0,9..144,100..900,0..100,0..1;1,9..144,100..900,0..100,0..1&family=Libre+Caslon+Text:ital,wght@0,400;0,700;1,400&display=swap";

export const metadata: Metadata = {
  title: "Awab Elkhalil — Designer & Developer",
  description:
    "Portfolio and CV of Awab Elkhalil — designer and developer building multilingual, Arabic-first web products end to end. Based in Istanbul.",
  openGraph: {
    title: "Awab Elkhalil — Designer & Developer",
    description:
      "Designer and developer. I design it, then I build it — end to end, every pixel.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Awab Elkhalil — Designer & Developer",
    description:
      "Designer and developer. I design it, then I build it — end to end, every pixel.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link href={fontUrl} rel="stylesheet" />
      </head>
      <body className="h-full">
        {children}
      </body>
    </html>
  );
}
