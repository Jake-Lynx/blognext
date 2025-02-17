// Actions
import { getBlogBySlug } from '@/actions/blog'

// Next
import Image from 'next/image'


export default async function BlogContent(
    {slug}: {slug: string}
) {
    const blog = await getBlogBySlug(slug)

    console.log(slug)
    if (!blog) {
        return (
            <p>Oups, ce blog n'exise pas</p>
        )
    }

    return (
        <div>
            <Image
                src={blog.cover}
                alt={blog.title}
                width={400}
                height={100}
            />

            <div>
                <p>{blog.title}</p>
                <p>{`${blog.createdAt}`}</p>
                <p>{blog.category}</p>
                <p>{blog.content}</p>
            </div>
        </div>
    )
}
