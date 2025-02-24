// react & next
import { Suspense } from "react"

// components
import LatestArticles from "@/components/articles/latest-articles"
import SkeletonLatestArticles from "@/components/skeleton/skeleton-latest-articles"


export default async function Home() {
  return (
    <div className="container mx-auto px-4 py-4 md:py-8">
      <Suspense fallback={<SkeletonLatestArticles />}>
        <LatestArticles />
      </Suspense>
    </div>
  )
}

