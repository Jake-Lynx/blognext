// react & next
import Image from "next/image"
import Link from "next/link"

// actions & utils
import { UserArticleProps } from "@/utils/definition"
import { formatDate } from "@/utils/format-date"


export function UserArticleCard({ article }: {article: UserArticleProps}) {
  return (
    <article className="rounded-lg overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow">
      <Link href={`/articles/${article.slug}`}>
        <Image
          src={article.cover || "/placeholder.svg"}
          alt={article.title}
          width={500}
          height={300}
          className="w-full object-cover aspect-[5/3]"
        />
      </Link>
      <div className="p-4">
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-3">
          <div className="flex flex-wrap items-center gap-2 text-sm text-gray-500">
            <span>{formatDate(article.createdAt)}</span>
            <span className="text-teal-500">
              {article.category}
            </span>
          </div>
        </div>
        <h2 className="text-lg font-semibold mb-2 text-gray-900">
          <Link
            href={`/articles/${article.slug}`}
            className="hover:text-teal-500 transition-colors"
          >
            {article.title}
          </Link>
        </h2>
      </div>
    </article>
  )
}

