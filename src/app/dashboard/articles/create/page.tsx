// react & next
import React, { Suspense } from 'react'
import Link from 'next/link'

// icons
import { CircleArrowLeft } from 'lucide-react'

// components
import ArticleForm from '@/components/form/article-form'
import { Button } from '@/components/ui/button'


export default function ArticleOperation() {
  return (
    <div>
      <div className="flex justify-start">
        <Button asChild>
          <Link
              href='/dashboard/author'
              className="ml-[7rem] mt-2 bg-red-500 hover:bg-red-600"
          >
              <CircleArrowLeft /> Retour
          </Link>
        </Button>
      </div>

      <Suspense fallback={<p>Chargement...</p>}>
        <ArticleForm mode='create'/>
      </Suspense>
    </div>
  )
}
