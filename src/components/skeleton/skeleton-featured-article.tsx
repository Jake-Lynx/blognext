import { Skeleton } from "@/components/ui/skeleton"

export function SkeletonFeaturedArticle() {
  return (
    <article className="rounded-lg overflow-hidden bg-white dark:bg-gray-900 dark:border-2 dark:border-white">
      <div className="relative w-full aspect-[2/1]">
        <Skeleton className="w-full h-full" />
      </div>
      <div className="mt-4 md:mt-6 px-4 md:px-0">
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-3">
          <Skeleton className="h-8 w-8 rounded-full" />
          <div className="flex flex-wrap items-center gap-2 text-sm text-gray-500">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-4 w-12" />
          </div>
        </div>
        <Skeleton className="h-6 w-3/4 mb-3" />
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-5/6" />
      </div>
    </article>
  )
}
