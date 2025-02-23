// React
import React, { Suspense } from 'react'

// Components
import ArticlesList from './articles-list'
import { SkeletonArticlesList } from '@/components/skeleton/skeleton-article-list'


export default async function Articles(
  {searchParams} :
  {searchParams: Promise<{query?: string, page: string}>}
) {

  const params = await searchParams
  const query = params.query || ''
  const currentPage = Number(params.page) || 1
  const pageSize = 6

    return (
      <div>
        <h1
          className='text-center text-3xl font-semibold pt-4 bg-gradient-to-t from-blue-600 to-purple-500 text-transparent bg-clip-text dark:text-white'
        >
          Liste des articles
        </h1>

        <Suspense fallback={<SkeletonArticlesList /> }>
          <ArticlesList
            currentPage={currentPage}
            pageSize={pageSize}
            query={query}
          />
        </Suspense>
      </div>
    )
}
