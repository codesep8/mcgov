import { Header } from "@/components/layout/header";

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