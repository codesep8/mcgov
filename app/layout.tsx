import { IBM_Plex_Sans_KR } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme";
import Link from "next/link";

const IBMPlexSansKR = IBM_Plex_Sans_KR({
  weight: ['600', '500'],
  subsets: ['latin'],
  display: 'swap',
});

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${IBMPlexSansKR.className} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
          <hr/>
          <Link href="/">메인</Link>&nbsp;|&nbsp;<Link href="/bank">은행</Link>
        </ThemeProvider>
      </body>
    </html>
  );
}
