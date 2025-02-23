import { Skeleton } from "@/components/ui/skeleton";

export function SkeletonArticleCard() {
  return (
    <article className="rounded-lg overflow-hidden bg-white shadow-sm transition-shadow">
      <Skeleton className="w-full h-[200px]" /> {/* Image */}
      <div className="p-4">
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-3">
          <Skeleton className="h-8 w-8 rounded-full" /> {/* Avatar */}
          <div className="flex flex-wrap items-center gap-2 text-sm">
            <Skeleton className="h-4 w-20" /> {/* Nom auteur */}
            <Skeleton className="h-4 w-16" /> {/* Date */}
            <Skeleton className="h-4 w-12" /> {/* Catégorie */}
          </div>
        </div>
        <Skeleton className="h-6 w-full mb-2" /> {/* Titre */}
        <Skeleton className="h-4 w-3/4" /> {/* Extrait */}
      </div>
    </article>
  );
}
