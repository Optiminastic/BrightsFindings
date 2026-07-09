import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
  style: ["normal", "italic"],
  axes: ["opsz", "SOFT", "WONK"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const SITE_URL = "https://brightsfindings.com";

const DESCRIPTION =
  "In-depth, first-principles research and analysis — deep dives, data science, and clear explainers across AI, neuroscience, physics, climate, and biology.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default:
      "Brights Findings — In-depth, First-Principles Research & Analysis",
    template: "%s | Brights Findings",
  },
  description: DESCRIPTION,
  keywords: [
    "research",
    "first principles",
    "analysis",
    "deep dives",
    "data science",
    "explainers",
  ],
  applicationName: "Brights Findings",
  authors: [{ name: "Brights Findings" }],
  creator: "Brights Findings",
  publisher: "Brights Findings",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: "Brights Findings",
    url: SITE_URL,
    locale: "en_US",
    title:
      "Brights Findings — In-depth, First-Principles Research & Analysis",
    description: DESCRIPTION,
    images: [
      {
        url: "/icon.svg",
        width: 1200,
        height: 630,
        alt: "Brights Findings — In-depth, first-principles research and analysis",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Brights Findings — In-depth, First-Principles Research & Analysis",
    description: DESCRIPTION,
    images: ["/icon.svg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-paper text-ink">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
