// components
import { SkeletonFeaturedArticle } from './skeleton-featured-article'
import { SkeletonArticleCard } from './skeleton-article-card'


export default function SkeletonLatestArticles() {
    return (
        <>
            <SkeletonFeaturedArticle />
            <div
                className="mt-6 md:mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6"
            >
                {Array(4).fill(0).map((_, index) => (
                    <SkeletonArticleCard
                        key={index}
                    />
                ))}

            </div>
        </>
    )
}
