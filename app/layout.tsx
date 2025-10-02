import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { PageTransition } from "@/components/page-transition";
import { ThemeProvider } from "@/contexts/theme-context";
import { ThemeWrapper } from "@/components/theme-wrapper";
import TitleSetter from "@/components/title-setter";

const fontSans = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
});

const fontMono = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.svg" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body
        className={`${fontSans.variable} ${fontMono.variable} font-sans antialiased`}
      >
        <ThemeProvider>
          <ThemeWrapper>
            <TitleSetter />
            <PageTransition>
              {children}
            </PageTransition>
          </ThemeWrapper>
        </ThemeProvider>
      </body>
    </html>
  );
}
