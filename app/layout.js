import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import Nav from './components/nav'
import Head from "next/head";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});


export const metadata = {
  metadataBase: new URL("https://www.akmweb.online"), // ✅ Fix for Open Graph & Twitter images
  title: "AUNG KO MYINT - Web Design & Tech Journey",
  description:
    "Explore Aung Ko Myint’s portfolio showcasing web development, tech research, and innovative solutions in coding, design, and problem-solving",
  keywords:
    "Aung Ko Myint, aungkomyint portfolio, aungkomyint SEO, web development, full-stack development, tech portfolio, web designer, NextJS developer, Python, JavaScript developer",
  verification: {
    google: "qq5LMRxX1OqdBEt2g9cspGhC0OC21pDPxDf-CtyDbjY",
  },
  openGraph: {
    title: "AUNG KO MYINT - Web Design & Tech Journey",
    description:
      "Explore Aung Ko Myint’s portfolio showcasing web development, tech research, and innovative solutions in coding, design, and problem-solving",
    url: "https://www.akmweb.online",
    site_name: "Aung Ko Myint",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Aung Ko Myint Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@aungkomyint",
    creator: "@aungkomyint",
    title: "AUNG KO MYINT - Web Design & Tech Journey",
    description:
      "Explore Aung Ko Myint’s portfolio showcasing web development, tech research, and innovative solutions in coding, design, and problem-solving",
    images: ["/twitter-image.png"],
  },
  alternates: {
    canonical: "https://www.akmweb.online", // ✅ Auto-generates <link rel="canonical">
  },
 
};

export default function RootLayout({ children }) {
  
  return (
    <html lang="en">
      <Head>

      <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0" />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Aung Ko Myint",
              "url": "https://www.akmweb.online",
              "image": "https://www.akmweb.online/profile.jpg", // Update with your actual image URL
              "sameAs": [
                "https://twitter.com/aungkomyint",
                "https://www.linkedin.com/in/aungkomyint",
                "https://github.com/aungkomyint"
              ],
              "jobTitle": "Web Developer & SEO Specialist",
              "worksFor": {
                "@type": "Organization",
                "name": "akmwebonline",
              }
            }),
          }}
        />

   
        </Head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
      <Nav />
        {children}

        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-CRT82MG1CM"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-CRT82MG1CM', { page_path: window.location.pathname });
          `}
        </Script>
      </body>
    </html>
  );
}
