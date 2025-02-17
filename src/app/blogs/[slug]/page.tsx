import React, { Suspense } from 'react'
import BlogContent from './blog-content'

export default async function BlogPage(
    {params}: {params: Promise<{slug: string}>}
) {
    const slug = (await params).slug

    return (
        <div>
            <Suspense fallback={<p>Chargement...</p>}>
                <BlogContent slug={slug} />
            </Suspense>
        </div>
    )
}
