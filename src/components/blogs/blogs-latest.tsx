import { getLastBlogs } from '@/actions/blog'
import { BlogProps } from '@/utils/definition'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default async function BlogsLatest() {
    const blogs = await getLastBlogs()

    if (!blogs) {
        return "Pas d'article dispo"
    }

    return (
        <div>
            {blogs.map((blog: BlogProps) => (
                <div key={blog.id}>
                    <Link href={`/blogs/${blog.slug}`}>
                        <Image
                            src={blog.cover}
                            alt={blog.title}
                            className='object-cover'
                            width={150}
                            height={50}
                        />
                    </Link>
                    <p>{blog.title}</p>
                    <p>Slug: {blog.slug}</p>
                    <p>{`${blog.createdAt}`}</p>
                    <p>{blog.category}</p>
                    <p>{blog.resume}</p>
                </div>
            ))}
        </div>
    )
}
