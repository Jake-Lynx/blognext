// actions
import { getArticlesPaginated } from "@/actions/article"

// others lib
import { ArticleCard } from "@/components/articles/article-card"
import { PaginationWithLinks } from "@/components/ui/pagination-with-links"


export default async function ArticlesList(
    {currentPage, pageSize, query} :
    {
        currentPage: number,
        pageSize: number,
        query: string
    }
) {

    const {articles, totalArticles} = await getArticlesPaginated(currentPage, pageSize, query)

    return (
        <>
            <div
                className="mt-6 md:mt-8 sm:mx-4 mx-auto flex flex-wrap justify-center gap-4 md:gap-6"
            >
                {articles.map((article) => (
                    <div
                        key={article.id}
                        className="w-[21.8rem]"
                    >
                        <ArticleCard
                            article={article}
                        />
                    </div>
                ))}
            </div>

            <div className="mt-5">
                <PaginationWithLinks
                    page={currentPage}
                    pageSize={pageSize}
                    totalCount={totalArticles}
                />
            </div>
        </>
    )
}
