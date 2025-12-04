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
        <OpenPanelComponent
          clientId={process.env.OPEN_PANEL_CLIENT_ID}
          trackScreenViews={true}
        // trackAttributes={true}
        // trackOutgoingLinks={true}
        // If you have a user id, you can pass it here to identify the user
        // profileId={'123'}
        />
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
