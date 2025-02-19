// Actions
import { getArticleBySlug } from '@/actions/article'

// Next
import Image from 'next/image'

// Others lib
import { formatDate } from '@/utils/format-date'
import Link from 'next/link'


export default async function ArticleContent(
    {slug}: {slug: string}
) {
    const article = await getArticleBySlug(slug)

    console.log(slug)
    if (!article) {
        return (
            <p>Oups, ce article n'exise pas</p>
        )
    }

    return (
        <div>
            <Image
                src={article.cover}
                alt={article.title}
                width={400}
                height={100}
            />

            <div>
                <p>{article.title}</p>
                <p>{formatDate(article.createdAt)}</p>
                <p>{article.category}</p>
                <p>
                    <Link href={`/authors/${article.author.id}`}>
                        {article.author.username}
                    </Link>
                </p>
                <div dangerouslySetInnerHTML={{ __html: article.content }} />
            </div>
        </div>
    )
}
