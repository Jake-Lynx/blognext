// react & next
import React from 'react'
import Link from 'next/link'

// Actions
import { getArticleBySlug } from '@/actions/article'

// Icons
import { CircleArrowLeft } from 'lucide-react'

// Components
import ArticleForm from '@/components/form/article-form'
import { Button } from '@/components/ui/button'

// Others lib
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

    if (authorId !== user?.id) {
        redirect('/dashboard/articles')
    }

    return (
        <div>
            <div className="flex justify-start">
                <Button asChild>
                <Link
                    href='/dashboard/author'
                    className="ml-[7rem] mt-2 bg-red-500 hover:bg-red-600"
                >
                    <CircleArrowLeft /> Retour
                </Link>
                </Button>
            </div>

            <ArticleForm
                mode='edit'
                initialData={{...article}}
            />
        </div>
    )
}
