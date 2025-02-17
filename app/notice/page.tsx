import { prisma } from "@/lib/prisma";
import { unstable_cache } from "next/cache";

const getNoticeList = unstable_cache(
    async (page: number) => {
        return await prisma.notices.findMany({
            skip: (page - 1) * 10,
            take: 10,
            orderBy: { created_at: "desc" }
        });
    },
    [],
    { revalidate: 60 }
);

export default async function NoticeListPage({ searchParams }: { searchParams: { page?: string } }) {
    const page = searchParams.page ? parseInt(searchParams.page, 10) : 1;
    const notices = await getNoticeList(page);

    return (
        <div>
            <h1>공지 리스트</h1>
            <ul>
                {notices.map((notice) => (
                    <li key={notice.id}>{notice.title}</li>
                ))}
            </ul>
        </div>
    );
}