import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Exceed Learning Center - Public Speaking Course",
  description: "Gain the confidence and practical skills to deliver engaging and impactful presentations.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&family=Open+Sans:wght@400;500;600;700&display=swap" rel="stylesheet" />
        <link rel="icon" type="image/svg+xml" href="/vite.svg" />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
