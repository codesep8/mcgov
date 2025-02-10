import Link from "next/link";
import { UserMenu } from "./user";

export function Header() {
    return (
        <header>
            <nav>
                <Link href="/">홈</Link>
                &nbsp;|&nbsp;
                <Link href="/notice">공지</Link>
                &nbsp;|&nbsp;
                <UserMenu/>
            </nav>
        </header>
    )
}