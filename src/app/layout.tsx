import type { Metadata } from "next";
import { Geist, Geist_Mono, Plus_Jakarta_Sans, Orbitron } from "next/font/google";
import "./globals.css";
import Providers from "@/components/providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
});

const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Port4lio",
  description: "Create beautiful portfolios in minutes",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${plusJakartaSans.variable} ${orbitron.variable} antialiased`}
      >
        <Providers>
          {children}
        </Providers>
        
        {/* Omnidimension Chatbot Integration */}
        <script 
          id="omnidimension-web-widget" 
          async 
          src="https://backend.omnidim.io/web_widget.js?secret_key=19682f7376caf81ec125a45a05cb92f5"
        />
      </body>
    </html>
  );
}
