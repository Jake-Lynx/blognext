'use client'

import { supprimerArticle } from '@/actions/article'
import React from 'react'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'

export function DeleteArticle(
    {id}: {id: string}
) {
    const router = useRouter()

    const handleClick = async () => {
        const response = await supprimerArticle(id)

        if (response?.success) {
            toast.success(response.message)
        } else {
            toast.error(response.message)
        }
        router.push('/dashboard/articles')
    }
    return (
        <button
            onClick={handleClick}
        >
            Supprimer cet article
        </button>
    )
}
