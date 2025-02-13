import { MetaData } from "@/components/metaData";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { unstable_cache } from "next/cache";

const getNoticeList = unstable_cache(
    async (page: number) => {
      return await prisma.notices.findMany({
          skip: (page - 1) * 10,
            take: 10,
            orderBy: { created_at: "desc" }
      })
    },
    [],
    { revalidate: 120 }
)

export default async function NoticePage({ searchParams }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }>}) {
    const rawId = (await searchParams).page
    if (isNaN(rawId)) {
        return notFound()
    }
    const id = Number(rawId)
    const data = await getNotice(id);

    if (!data) {
        return notFound()
    }
    
    return (
        <div>
            <MetaData title="공지"/>
            {notices.map((notice) => (
                    <li key={notice.id}>{notice.title}</li>
            ))}
        </div>
    )
}