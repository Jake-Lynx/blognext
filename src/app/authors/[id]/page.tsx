// react & next
import React, { Suspense } from 'react'

// actions
import { getAuthor } from '@/actions/user'

// components
import UserArticlesList from '@/components/users/user_articles-list';


export default async function AuthorPage(
    {params}: {params: Promise<{id: string}>}
) {
    const authorId = (await params).id
    const data = await getAuthor(authorId)

    if (!data.author) {
        console.log("Auteur introuvable");
        return;
    }

    return (
        <div className='dark:bg-gray-900'>
            <h2 className='text-center font-bold mt-4 mb-8 text-3xl'>
                Articles de "{data.author.username}"
            </h2>

            <div className='flex flex-wrap justify-center gap-5 mt-3'>
                <Suspense fallback={<p>Chargement...</p>}>
                    {/* Articles list */}
                    <UserArticlesList
                        articles={data.author.articles}
                    />
                </Suspense>
            </div>

        </div>
    )
}
