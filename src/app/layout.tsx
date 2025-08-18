import type { Metadata } from "next";
import { Instrument_Sans } from "next/font/google";
import "./globals.css";

const instrumentSans = Instrument_Sans({
  variable: "--font-instrument-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
  fallback: ["system-ui", "arial"],
  preload: true,
  adjustFontFallback: true,
});

export const metadata: Metadata = {
  title: "Usuals.ai - AI-Powered Video Creation Platform",
  description: "Turn any brief or clips into polished reels, ads, or short films in minutes. Usuals.ai learns your style, automates scripting, shot building, and editing to 10x your creativity.",
  keywords: ["video creation", "AI video editor", "automated video editing", "content creation", "video automation", "short films", "video ads", "video reels"],
  openGraph: {
    title: "Usuals.ai - Write it. Drop it. Watch it.",
    description: "Create full videos in minutes with AI. Transform briefs and clips into professional content that matches your style.",
    type: "website",
    siteName: "Usuals.ai",
  },
  twitter: {
    card: "summary_large_image",
    title: "Usuals.ai - AI-Powered Video Creation",
    description: "Turn any brief or clips into polished videos in minutes. Let AI handle scripting, shots, and editing.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/png" href="/image.png" />
      </head>
      <body
        className={`${instrumentSans.className} antialiased`}
      >
        {/* <a href="/success?session_id=cs_test_example" className="text-blue-600 underline">Test Success Page</a> */}
        {children}
      </body>
    </html>
  );
}
