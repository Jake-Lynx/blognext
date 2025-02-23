// react & next
import React, { Suspense } from 'react'
import Link from 'next/link'

// components
import ArticleContent from './article-content'
import SkeletonArticleContent from '@/components/skeleton/skeleton-article-content'
import { Button } from '@/components/ui/button'

// icons
import { CircleArrowLeft } from 'lucide-react'


export default async function ArticlePage(
    {params}: {params: Promise<{slug: string}>}
) {
    const slug = (await params).slug

    return (
        <div>
            <div className="flex justify-start">
                <Button asChild>
                    <Link
                        href='/articles'
                        className="ml-[7rem] mt-2 bg-red-500 hover:bg-red-600"
                    >
                        <CircleArrowLeft /> Retour
                    </Link>
                </Button>
            </div>
            <Suspense fallback={<SkeletonArticleContent />}>
                <ArticleContent slug={slug} />
            </Suspense>
        </div>
    )
}
