import { IBM_Plex_Sans_KR } from "next/font/google";
import { ThemeProvider } from "@/components/providers/theme";
import { Announcement } from "@/components/layout/announcement";
import { PrelineScript } from "@/components/providers/preline";
import { Header } from "@/components/layout/header";
import "./globals.css";

const IBMPlexSansKR = IBM_Plex_Sans_KR({
  weight: ['600', '500'],
  subsets: ['latin'],
  display: 'swap',
});

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html lang="kr" suppressHydrationWarning>
      <body className={`${IBMPlexSansKR.className} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Header />
          <Announcement />
          <main className="p-4">
            {children}
          </main>
        </ThemeProvider>
        <PrelineScript/>
      </body>
    </html>
  );
}
