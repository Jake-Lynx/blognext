// Actions
import { getArticleBySlug } from '@/actions/article'

// Others lib
import HeroSection from '@/components/articles/hero-section'
import RecentsArticles from '@/components/articles/recents-articles'


export default async function ArticleContent(
    {slug}: {slug: string}
) {
    const article = await getArticleBySlug(slug)

    if (!article) {
        return (
            <p>Oups, ce article n'exise pas</p>
        )
    }    

    return (
        <>
            {/* Hero Section */}
            <HeroSection
                article={article}
            />

            {/* Article content */}
            <div
                className="container mx-auto px-4 mt-4 displayContent prose lg:prose-xl text-gray-600 dark:text-gray-300 dark:prose-invert"
                dangerouslySetInnerHTML={{ __html: article.content as string}}
            />

            {/* Trending Posts */}
            <RecentsArticles
            />
        </>
    )
}
