import { Skeleton } from "@/components/ui/skeleton";

export function SkeletonRecentsArticles() {
  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <Skeleton className="h-10 w-1/3 mx-auto mb-10" /> {/* Titre principal */}
        <div className="flex flex-wrap justify-between mt-5">
          {[...Array(3)].map((_, index) => (
            <article key={index} className="group w-[300px] gap-3">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="relative w-[300px] h-[200px] overflow-hidden rounded-lg">
                  <Skeleton className="w-full h-full" /> {/* Image article */}
                </div>
              </div>
              <div className="mb-4">
                <Skeleton className="h-4 w-32" /> {/* Date et catégorie */}
                <Skeleton className="h-6 w-full mt-2" /> {/* Titre article */}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
