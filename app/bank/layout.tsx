import { BankHeader } from "@/components/layout/bankHeader";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: {
        template: `%s | BoI`,
        default: `Bank of Iodine`,
    },
    description: "Iodine 공식 은행 웹페이지입니다.",
};

export default function BankLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
    return (
        <div>
            <BankHeader/>
            {children}
        </div>
    );
  }