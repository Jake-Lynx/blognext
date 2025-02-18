import React, { Suspense } from 'react'
import BlogContent from './blog-content'
import Link from 'next/link'

export default async function BlogPage(
    {params}: {params: Promise<{slug: string}>}
) {
    const slug = (await params).slug

    return (
        <div>
            <Link href='/blogs'>Retour</Link> <br />
            <Suspense fallback={<p>Chargement...</p>}>
                <BlogContent slug={slug} />
            </Suspense>
        </div>
    )
}
