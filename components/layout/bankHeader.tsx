import Link from "next/link";
import { UserMenu } from "./user";

export function BankHeader() {
    return (
        <header>
            <nav>
                <Link href="/bank">홈</Link>
                &nbsp;|&nbsp;
                <Link href="/bank/deposit">이체</Link>
                &nbsp;|&nbsp;
                <Link href="/bank/logs">거래기록</Link>
                &nbsp;|&nbsp;
                <UserMenu/>
            </nav>
        </header>
    )
}