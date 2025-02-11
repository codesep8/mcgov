import { IBM_Plex_Sans_KR } from "next/font/google";
import { ThemeProvider } from "@/components/providers/theme";
import { Announcement } from "@/components/layout/announcement";
import { Header } from "@/components/layout/header";
import "./globals.css";
import { ProgressBarProvider } from "@/components/providers/progress";

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
          <ProgressBarProvider>
            <Header />
            <Announcement />
            <main className="p-4">
              {children}
            </main>
          </ProgressBarProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
