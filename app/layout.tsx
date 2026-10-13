import type { Metadata } from "next";
import "./globals.css";
import "./capabilities.css";
import "./leadership.css";
import "./innovation-projects.css";

export const metadata: Metadata = {
  title: "TAN Can | Research, Finance & AI",
  description: "TAN Can is an Applied Economics master's student at Shandong University working across finance, causal research and AI applications.",
  other: {
    "theme-color": "#FAF9F6",
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
