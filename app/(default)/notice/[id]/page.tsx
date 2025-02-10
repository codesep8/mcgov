import { MetaData } from "@/components/metaData";

export default async function NoticePage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
    const id = (await params).id
    return (
        <div>
            <MetaData title={id}/>
            공지상세
        </div>
    )
}