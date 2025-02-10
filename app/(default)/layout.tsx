import { Header } from "@/components/layout/header";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: {
        template: `%s | Iodine`,
        default: `Iodine`,
    },
    description: "Iodine의 공식 웹페이지입니다.",
};

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