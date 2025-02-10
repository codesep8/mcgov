import { Header } from "@/components/layout/header";
import { MetaData } from "@/components/metaData";

export default function Layout({ children }: Readonly<{ children: React.ReactNode; }>) {
    return (
        <div>
            <MetaData />
            <Header/>
            <main>
                {children}
            </main>
        </div>
    )
}