import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Script from "next/script"; // Import Script for Google Analytics
import Head from "next/head"; // Import Head for meta tags

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "AUNG KO MYINT - Web Design & Tech Journey",
  description:
    "Explore Aung Ko Myint’s portfolio showcasing web development, tech research, and innovative solutions in coding, design, and problem-solving",
  keywords:
    "Aung Ko Myint, aungkomyint portfolio,aungkomyint SEO, web development, full-stack development, tech portfolio, web designer, NextJS developer, Python, JavaScript developer",
  verification: {
    google: "qq5LMRxX1OqdBEt2g9cspGhC0OC21pDPxDf-CtyDbjY", // Replace with your Google verification code
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
    
        <link rel="canonical" href="https://akmkweb.online" />
      </Head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
        
        {/* Move Google Analytics here */}
        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-CRT82MG1CM"
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-CRT82MG1CM');
            `,
          }}
        />
      </body>
    </html>
  );
}
