import { getBlogs } from '@/actions/blog'
import { DeleteBlog } from '@/components/ui/custom-button'
import Link from 'next/link'
import React from 'react'

export default async function AdminBlogList() {
    const blogs = await getBlogs()

    if (!blogs) {
        return 'Aucun articles disponible.'
    }
    return (
        <div>
            {blogs.map((blog) => (
                <div key={blog.id}>
                    <h3>{blog.title}</h3>
                    <Link href={`/dashboard/blogs/edit/${blog.slug}`}>
                        Modifier l'article
                    </Link>
                    <DeleteBlog id={blog.id} />
                </div>
            ))}
        </div>
    )
}
