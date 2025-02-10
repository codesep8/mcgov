import { Header } from "@/components/layout/header";
import type { Metadata } from "next";

export default function Layout({ children }: Readonly<{ children: React.ReactNode; }>) {
    return (
        <div>
            <Header/>
            <main>
                {children}
            </main>
        </div>
    )
}