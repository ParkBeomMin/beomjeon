import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "범전 문서 | 개발 지식 저장소",
  description: "개발자 범전이 공유하는 기술 문서 모음",
  authors: [{ name: "범전" }],
  keywords: ["개발", "프로그래밍", "기술문서", "코딩"],
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="scroll-smooth">
      <head>
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        
        {/* Highlight.js 스타일시트 */}
        <link 
          rel="stylesheet" 
          href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.8.0/styles/github-dark.min.css" 
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        
        {/* Highlight.js 스크립트 */}
        <Script 
          src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.8.0/highlight.min.js" 
          strategy="afterInteractive"
          id="hljs-main"
        />
        <Script 
          src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.8.0/languages/typescript.min.js" 
          strategy="afterInteractive"
          id="hljs-ts"
        />
        <Script 
          src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.8.0/languages/javascript.min.js" 
          strategy="afterInteractive"
          id="hljs-js"
        />
        <Script 
          src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.8.0/languages/bash.min.js" 
          strategy="afterInteractive"
          id="hljs-bash"
        />
        
        {/* 하이라이팅 초기화 스크립트 */}
        <Script id="hljs-init" strategy="afterInteractive">
          {`
            document.addEventListener('DOMContentLoaded', function() {
              if (window.hljs) {
                window.hljs.configure({ ignoreUnescapedHTML: true });
                window.hljs.highlightAll();
              }
            });
          `}
        </Script>
      </body>
    </html>
  );
}
