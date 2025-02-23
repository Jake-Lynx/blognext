// components
import { SkeletonHeroSection } from './skeleton-hero-section'
import { SkeletonRecentsArticles } from './skeleton-recents-articles'

export default function SkeletonArticleContent() {
    return (
        <>
            <SkeletonHeroSection />
            <SkeletonRecentsArticles />
        </>
    )
}
