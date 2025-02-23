// components
import { SkeletonArticleCard } from "./skeleton-article-card";
import { SkeletonPaginationLinks } from "./skeleton-pagination-links";

export function SkeletonArticlesList() {
    return (
      <>
        <div className="mt-6 md:mt-8 sm:mx-4 mx-auto flex flex-wrap justify-center gap-4 md:gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="w-[21.8rem]">
              <SkeletonArticleCard />
            </div>
          ))}
        </div>
  
        <SkeletonPaginationLinks /> {/* Pagination en chargement */}
      </>
    );
  }
  