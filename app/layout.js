import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
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
  title: 'AUNG KOMYINT - Web Design & Tech Journey',
  description: 'Explore Aung Ko Myint’s portfolio, showcasing web development, full-stack skills, and tech passion.',
  keywords: 'Aung Ko Myint, aungkomyint portfolio, portfolio, web development, full-stack development, tech portfolio, web designer, PHP developer, Laravel, JavaScript developer',
  verification: {
    google: 'qq5LMRxX1OqdBEt2g9cspGhC0OC21pDPxDf-CtyDbjY', // Replace with your Google verification code
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
        <link rel="canonical" href="https://akmkweb.online" /> {/* Replace with your canonical URL */}
      </Head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
