import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Shadrepo - Shadcn UI Component Registry",
  description: "A comprehensive registry of Shadcn UI components.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <script
          src="https://rybbit.shadrepo.xyz/api/script.js"
          data-site-id="1"
          data-track-errors="true"
          data-web-vitals="true"
          defer
        ></script>
      </head>
      <body>{children}</body>
    </html>
  );
}
