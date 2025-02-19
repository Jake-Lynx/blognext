import { getArticles } from '@/actions/article'
import { DeleteArticle } from '@/components/ui/custom-button'
import Link from 'next/link'
import React from 'react'
import { currentUser } from '@clerk/nextjs/server'

export default async function AdminArticleList() {
    const articles = await getArticles()

    if (!articles) {
        return 'Aucun articles disponible.'
    }

    const signedUser = await currentUser() 

    return (
        <div>
            {articles.map((article) => (
                <div key={article.id} className='mt-2 p-2 border-2'>
                    <h3>{article.title}</h3>
                    {article.author.clerkId === signedUser?.id && (
                        <>
                            <Link href={`/dashboard/articles/edit/${article.slug}`}>
                                Modifier l'article
                            </Link>
                            <DeleteArticle id={article.id} />
                        </>
                    )
                    }
                </div>
            ))}
        </div>
    )
}
