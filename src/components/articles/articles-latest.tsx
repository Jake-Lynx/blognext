import { getLastArticles } from '@/actions/article'
import { ArticleProps } from '@/utils/definition'
import { formatDate } from '@/utils/format-date'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default async function ArticlesLatest() {
    const articles = await getLastArticles()

    if (!articles) {
        return "Pas d'article dispo"
    }

    return (
        <div>
            {articles.map((article: ArticleProps) => (
                <div key={article.id}>
                    <Link href={`/articles/${article.slug}`}>
                        <Image
                            src={article.cover}
                            alt={article.title}
                            className='object-cover'
                            width={150}
                            height={50}
                        />
                    </Link>
                    <p>{article.title}</p>
                    <p>{formatDate(article.createdAt)}</p>
                    <p>{article.category}</p>
                    <p>{article.resume}</p>
                    <p></p>
                </div>
            ))}
        </div>
    )
}
