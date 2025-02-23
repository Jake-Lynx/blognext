// react & next
import Image from 'next/image'
import Link from 'next/link'

// actions & utils
import { AuthorProps } from '@/utils/definition'

// icons
import { CircleChevronRight } from 'lucide-react'


export default function UserCard(
    {author}: {author: AuthorProps}
) {
    return (
        <div
            className="max-w-xs text-center py-2 px-4 rounded-md bg-slate-200 transform transition-transform duration-300 hover:scale-105"
        >
            <div
                className="relative mx-auto w-28 h-28 rounded-xl bg-blue-100 flex items-center justify-center shadow-md"
            >
                <Link href={`authors/${author.id}`} >
                    <Image
                        src={author.avatar}
                        alt={author.username}
                        fill
                        className="w-24 h-24 rounded-md"
                    />
                </Link>
            </div>
            <h3
                className="mt-4 text-lg font-semibold text-gray-900"
            >
                {author.username}
            </h3>
            <Link
                href={`authors/${author.id}`}
                className="mt-2 text-sm text-gray-600 hover:text-teal-500 inline-flex items-center gap-1"
            >
                Voir mes articles <CircleChevronRight size={16} />
            </Link>
        </div>
    )
}
