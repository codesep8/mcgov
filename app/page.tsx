import { MetaData } from "@/components/metaData";
import { IndexWidgets, IndexWidgetsSkeleton } from "@/components/page";
import { Suspense } from "react";

export default function HomePage() {
  return (
    <div>
      <MetaData title="홈"/>
      <Suspense fallback={<IndexWidgetsSkeleton />}>
        <IndexWidgets />
      </Suspense>
    </div>
  )
}