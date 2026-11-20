import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/ThemeProvider";
import Navbar from "@/components/Navbar";
import CustomCursor from "@/components/CustomCursor";
import SmoothScroll from "@/components/SmoothScroll";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

import { Playfair_Display } from "next/font/google";
const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});


export const metadata: Metadata = {
  title: "Patchipala Srinivas | Full Stack Developer Portfolio",
  description:
    "Official portfolio of Patchipala Srinivas, a Full Stack Developer specializing in React, Next.js, Python, Artificial Intelligence and Machine Learning.",
  applicationName: "Patchipala Srinivas",
  authors: [{ name: "Patchipala Srinivas" }],
  creator: "Patchipala Srinivas",
  publisher: "Patchipala Srinivas",
  keywords: [
    "Patchipala Srinivas",
    "Patchipala Srinivas Portfolio",
    "Patchipala Srinivas Developer",
    "Patchipala Srinivas Full Stack Developer",
    "Srinivas Patchipala",
    "React Developer",
    "Next.js Developer",
    "AI and Machine Learning Developer",
  ],
  openGraph: {
    title: "Patchipala Srinivas | Full Stack Developer Portfolio",
    description:
      "Explore the official portfolio of Patchipala Srinivas, showcasing web development, AI and Machine Learning projects.",
    url: "https://srinivaspatchipala.netlify.app/",
    siteName: "Patchipala Srinivas",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Patchipala Srinivas | Full Stack Developer",
    description: "Official developer portfolio of Patchipala Srinivas.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} antialiased bg-background text-foreground transition-colors duration-500`}>
        <script
          id="theme-init"
          dangerouslySetInnerHTML={{
            __html: `
              (() => {
                try {
                  const saved = localStorage.getItem('theme');
                  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                  const theme = saved ?? (prefersDark ? 'dark' : 'dark');
                  if (theme === 'dark') {
                    document.documentElement.classList.add('dark');
                  }
                } catch { /* noop */ }
              })();
            `,
          }}
        />
        <ThemeProvider>
          <CustomCursor />
          <SmoothScroll>
            <Navbar />
            <main>
              {children}
            </main>
          </SmoothScroll>
        </ThemeProvider>
      </body>
    </html>
  );
}
