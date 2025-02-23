import { Skeleton } from "@/components/ui/skeleton";

export function SkeletonPaginationLinks() {
  return (
    <div className="flex justify-center space-x-2 my-5">
      <Skeleton className="h-8 w-8 rounded" /> {/* Bouton Précédent */}
      {[...Array(5)].map((_, i) => (
        <Skeleton key={i} className="h-8 w-8 rounded" /> /* Pages */
      ))}
      <Skeleton className="h-8 w-8 rounded" /> {/* Bouton Suivant */}
    </div>
  );
}
