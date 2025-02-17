// Actions
import { getBlogsPaginated } from "@/actions/blog"

// Next
import Image from "next/image"

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
                        <Image
                            src={blog.cover}
                            alt={blog.title}
                            width={400}
                            height={200}
                        />
                        <p>{blog.title}</p>
                        <p>{blog.resume}</p>
                        <p>{`${blog.createdAt}`}</p>
                        <p>{blog.category}</p>
                    </div>
                ))}
            </div>
        </>
    )
}
