import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Pokedex",
  description: "A Next.js Pokedex",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@1.0.4/css/bulma.min.css" />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
