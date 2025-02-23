'use client'

import { useRouter } from "next/navigation"

export default function ScrollToTopLink(
    {slug, children}: {slug: string, children: React.ReactNode}
) {
    const router = useRouter()

    const handleClick = () => {
        router.push(`/articles/${slug}`)
        window.scrollTo(0, 0) // Remonte en haut de la page
    }

    return (
        <button
            onClick={handleClick}
            className="mt-2 text-md font-semibold hover:text-teal-500 cursor-pointer"
        >
            {children}
        </button>
    )
}