import { prisma } from "@/lib/prisma"
import { Megaphone } from "lucide-react"
import Link from "next/link"
import { Suspense } from "react"
import { unstable_cache } from 'next/cache'

const getNotice = unstable_cache(
  async () => {
    return  await prisma.notices.findFirst()
  },
  [],
  { revalidate: 3600 }
)

async function Fetcher() {
  const data = await getNotice();
  if (!data) {
    return <><Link href="/notice/new" className="underline">notice</Link> 에서 공지를 등록하십시오.</>
  }
  return <Link href={`/notice/${data?.id}`}>{data.title}</Link>
}

export function Announcement() {
  return (
      <div className="hs-removing:-translate-y-full bg-blue-500 dark:bg-blue-800">
        <div className="max-w-[85rem] px-2 py-2 sm:px-6 lg:px-8 mx-auto">
          <div className="flex">
            <Megaphone size={22} color="#ffffff" />
            &nbsp;
            <p className="text-white">
              <Suspense fallback={<>loading...</>}>
                <Fetcher/>
              </Suspense>
            </p>
          </div>
        </div>
    </div>
  )
}