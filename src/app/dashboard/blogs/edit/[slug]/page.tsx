import { getBlogBySlug } from '@/actions/blog'
import BlogForm from '@/components/form/blog-form'
import Link from 'next/link'
import React from 'react'

export default async function Blog(
    {params,}: {params: Promise<{slug: string}>}
) {
    const slug = (await params).slug
    const blog = await getBlogBySlug(slug)

    if (!blog) {
        return <p>Oups, cet article est introuvable</p>
    }

    return (
        <div>
            <Link href='/dashboard/blogs'>
                Retour
            </Link>

            <BlogForm
                mode='edit'
                initialData={{...blog}}
            />
        </div>
    )
}
