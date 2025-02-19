// react & next
import React from 'react'
import Link from 'next/link'

// Actions
import { getArticleBySlug } from '@/actions/article'

// Components
import ArticleForm from '@/components/form/article-form'

import { currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'

export default async function Article(
    {params,}: {params: Promise<{slug: string}>}
) {   
    
    const slug = (await params).slug
    const article = await getArticleBySlug(slug)

    if (!article) {
        return <p>Oups, cet article est introuvable</p>
    }
    const user = await currentUser()
    const authorId = article.author.clerkId

    console.log("User: ", user?.id);
    console.log("Author: ", article.author.clerkId);

    if (authorId !== user?.id) {
        redirect('/dashboard/articles')
    }

    return (
        <div>
            <Link href='/dashboard/articles'>
                Retour
            </Link>

            <ArticleForm
                mode='edit'
                initialData={{...article}}
            />
        </div>
    )
}
