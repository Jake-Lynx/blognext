// actions
import { getLastArticles } from '@/actions/article'

// components
import { FeaturedArticle } from './featured-article'
import { ArticleCard } from './article-card'


export default async function LatestArticles() {
    const articles = await getLastArticles()

    if (!articles) {
        return "Pas d'article dispo"
    }

    const lastArticle = articles[0]

    return (
        <>
            <FeaturedArticle
                article={lastArticle}
            />
            <div
                className="mt-6 md:mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6"
            >
                {articles.slice(1).map((article) => (
                    <ArticleCard
                        key={article.id}
                        article={article}
                    />
                ))}
            </div>
        </>
    )
}
