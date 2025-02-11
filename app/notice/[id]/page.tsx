import { MetaData } from "@/components/metaData";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { unstable_cache } from "next/cache";

const getNotice = unstable_cache(
    async (id: number) => {
      return await prisma.notices.findUnique({
          where: {
              id: id
          }
      })
    },
    [],
    { revalidate: 120 }
)

export default async function NoticePage({ params }: { params: Promise<{ id: number }>}) {
    const rawId = (await params).id
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
            <MetaData title={data.title}/>
            <h1 className="text-xl">{data.title}</h1>
        </div>
    )
}