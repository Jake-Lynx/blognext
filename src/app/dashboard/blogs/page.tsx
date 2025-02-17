import React, { Suspense } from 'react'
import AdminBlogList from './admin-blog-list'
import Link from 'next/link'

export default function Blogs() {
    return (
        <div>
            <h1>Admin / liste des blogs</h1>
            <Link href='/dashboard/blogs/create'>Ajouter un article</Link>

            <Suspense fallback={<p>Chargement...</p>}>
                <AdminBlogList />
            </Suspense>
        </div>
    )
}
