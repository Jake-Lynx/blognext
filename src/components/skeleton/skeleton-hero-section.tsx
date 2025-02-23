import { Skeleton } from "@/components/ui/skeleton";

export function SkeletonHeroSection() {
  return (
    <section className="py-12 md:py-20">
      <div className="container mx-auto px-4">
        <article className="group">
          <div className="mb-6 text-center">
            <Skeleton className="h-8 w-3/4 mx-auto" /> {/* Titre */}
            <div className="mt-4 flex justify-center gap-2">
              <Skeleton className="h-6 w-6 rounded-full" /> {/* Avatar auteur */}
              <div className="flex items-center gap-2 text-gray-500">
                <Skeleton className="h-4 w-20" /> {/* Nom auteur */}
                <Skeleton className="h-4 w-16" /> {/* Date */}
                <Skeleton className="h-4 w-16" /> {/* Catégorie */}
              </div>
            </div>
          </div>
          <div className="relative aspect-[16/9] overflow-hidden rounded-lg">
            <Skeleton className="w-full h-full" /> {/* Image de couverture */}
          </div>
        </article>
      </div>
    </section>
  );
}
