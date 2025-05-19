import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Script from 'next/script';
import { Analytics } from "@vercel/analytics/next"

export const metadata = {
  title: "खाद्यम् - waste2worth",
  description: "A website to help locate nearby food donation sites using AI",
  manifest: "/manifest.json"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`antialiased h-screen w-screen overflow-y-auto overflow-x-hidden flex flex-col items-center`}>
        <Navbar/>
        <div className="w-screen flex flex-col justify-center items-center">
          {children}
        </div>
        <Analytics />
        <Footer/>
        <Script src="https://cdn.lordicon.com/lordicon.js" strategy="lazyOnload" />
      </body>
    </html>
  );
}
