// Actions
import { getBlogBySlug } from '@/actions/blog'

// Next
import Image from 'next/image'

// Others lib
import { formatDate } from '@/utils/format-date'


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
                <p>{formatDate(blog.createdAt)}</p>
                <p>{blog.category}</p>
                <div dangerouslySetInnerHTML={{ __html: blog.content }} />
            </div>
        </div>
    )
}
