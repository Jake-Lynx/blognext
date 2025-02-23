// react & next
import { Suspense } from "react";

// components
import AuthorsList from "./authors-list";
import { SkeletonUserCard } from "@/components/skeleton/skeleton-user-card";


export default async function AuthorPage() {
    return (
        <section className="text-center py-12 bg-white dark:bg-gray-900">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            Auteurs
          </h2>
          <div>
            {/* Authors list */}
            <Suspense fallback={<SkeletonUserCard />}>
              <AuthorsList />
            </Suspense>
          </div>
        </section>
    )
}
