// Actions
import { getBlogsPaginated } from "@/actions/blog"

// Next
import Image from "next/image"
import Link from "next/link"

// Others lib
import { formatDate } from "@/utils/format-date"


export default async function BlogsList(
    {currentPage, pageSize, query} :
    {
        currentPage: number,
        pageSize: number,
        query: string
    }
) {

    const {blogs, totalBlogs} = await getBlogsPaginated(currentPage, pageSize, query)


    return (
        <>
            <div>
                {blogs?.map((blog) => (
                    <div key={blog.id}>
                        <Link
                            href={`/blogs/${blog.slug}`}
                        >
                            <Image
                                src={blog.cover}
                                alt={blog.title}
                                width={400}
                                height={200}
                            />
                        </Link>
                        <p>{blog.title}</p>
                        <div
                            dangerouslySetInnerHTML={{ __html: blog.resume}}
                        />
                        <p>{formatDate(blog.createdAt)}</p>
                        <p>{blog.category}</p>
                    </div>
                ))}
            </div>
        </>
    )
}
