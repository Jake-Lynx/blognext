import React, { Suspense } from 'react'
import ArticleContent from './article-content'
import Link from 'next/link'

export default async function ArticlePage(
    {params}: {params: Promise<{slug: string}>}
) {
    const slug = (await params).slug

    return (
        <div>
            <Link href='/articles'>Retour</Link> <br />
            <Suspense fallback={<p>Chargement...</p>}>
                <ArticleContent slug={slug} />
            </Suspense>
        </div>
    )
}
