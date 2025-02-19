import React, { Suspense } from 'react'
import AdminArticleList from './admin-article-list'
import Link from 'next/link'

export default function Articles() {
    return (
        <div>
            <h1>Admin / liste des articles</h1>
            <Link href='/dashboard/articles/create'>
                Ajouter un article
            </Link>
            <Link href='/dashboard/author'>
                Voir mes articles
            </Link>

            <Suspense fallback={<p>Chargement...</p>}>
                <AdminArticleList />
            </Suspense>
        </div>
    )
}
