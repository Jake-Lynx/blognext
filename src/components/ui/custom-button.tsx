'use client'

import { supprimerBlog } from '@/actions/blog'
import React from 'react'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'

export function DeleteBlog(
    {id}: {id: string}
) {
    const router = useRouter()

    const handleClick = async () => {
        const response = await supprimerBlog(id)

        if (response?.success) {
            toast.success(response.message)
        } else {
            toast.error(response.message)
        }
        router.push('/dashboard/blogs')
    }
    return (
        <button
            onClick={handleClick}
        >
            Supprimer cet article
        </button>
    )
}
