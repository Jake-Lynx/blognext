import ArticleForm from '@/components/form/article-form'
import Link from 'next/link'
import React, { Suspense } from 'react'

export default function ArticleOperation() {
  return (
    <div>
      <p>
        <Link href='/dashboard/articles'>
          Retour 
        </Link>
      </p>

      <Suspense fallback={<p>Chargement...</p>}>
        <ArticleForm mode='create'/>
      </Suspense>
    </div>
  )
}
