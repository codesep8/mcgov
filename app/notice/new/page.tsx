import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";

export default async function NewNoticePage() {
    const session = await getSession();
    if (!session.isAdmin) {
        return redirect('/');
    }
    
    async function postNotice(formdata: FormData) {
        "use server"
        const title  = formdata.get("title") as string
        const content = formdata.get("content") as string

        const result = await prisma.notices.create({
            data: {
                title: title,
                content: content,
                user: session.id,
                user_name: session.username
            }
        })

        return redirect(`/notice/${result.id}`)
    }

    return (
        <form action={postNotice}>
            <p>새 공지</p>
            <input name="title" placeholder="제목" required/>
            <input name="content" placeholder="내용" required/>
            <button role="submit">공지</button>
        </form>
    )
}