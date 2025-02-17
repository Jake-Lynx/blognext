import BlogForm from '@/components/form/blog-form'
import Link from 'next/link'
import React, { Suspense } from 'react'

export default function BlogOperation() {
  return (
    <div>
      <p>
        <Link href='/dashboard/blogs'>
          Retour 
        </Link>
      </p>

      <Suspense fallback={<p>Chargement...</p>}>
        <BlogForm mode='create'/>
      </Suspense>
    </div>
  )
}
