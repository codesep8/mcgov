import { getSession } from "@/lib/session"
import Link from "next/link";

export async function UserMenu() {
    const session = await getSession();
    return (
        <div>
            {session.isLoggedIn ?
            <p>{session.username}</p>    
            :
            <p><Link href="/auth/signin">로그인</Link>하십시오</p>
            }
        </div>
    )
}