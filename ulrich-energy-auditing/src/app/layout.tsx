import type { Metadata } from "next";
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

export const metadata: Metadata = {
  title: "Ulrich Energy Auditing | Twin Cities HERS Rater",
  description:
    "Professional HERS rating field services for Twin Cities builders. ENERGY STAR, ZERH certification, IECC compliance, and 45L tax credit documentation. Partner with us for volume new construction.",
  keywords: [
    "HERS rater",
    "energy audit",
    "Twin Cities",
    "Minnesota",
    "new construction",
    "ENERGY STAR",
    "ZERH",
    "45L tax credit",
    "blower door testing",
    "duct leakage testing",
    "Minnesota Green Path",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
