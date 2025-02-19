// Actions
import { getArticlesPaginated } from "@/actions/article"

// Next
import Image from "next/image"
import Link from "next/link"

// Others lib
import { formatDate } from "@/utils/format-date"


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
            <div>
                {articles?.map((article) => (
                    <div key={article.id}>
                        <Link
                            href={`/articles/${article.slug}`}
                        >
                            <Image
                                src={article.cover}
                                alt={article.title}
                                width={400}
                                height={200}
                            />
                        </Link>
                        <p>{article.title}</p>
                        <p>{article.author.username}</p>
                        <div
                            dangerouslySetInnerHTML={{ __html: article.resume}}
                        />
                        <p>{formatDate(article.createdAt)}</p>
                        <p>{article.category}</p>
                    </div>
                ))}
            </div>
        </>
    )
}
