// React
import React, { Suspense } from 'react'

// Components
import ArticlesList from './articles-list'

export default async function Articles(
  {searchParams} :
  {searchParams: Promise<{query?: string, page: string}>}
) {

  const params = await searchParams
  const query = params.query || ''
  const currentPage = Number(params.page) || 1
  const pageSize = 4

    return (
      <div>
        <h1>Liste des articles</h1>

        <Suspense fallback={<p>Chargement...</p>}>
          <ArticlesList
            currentPage={currentPage}
            pageSize={pageSize}
            query={query}
          />
        </Suspense>
      </div>
    )
}
