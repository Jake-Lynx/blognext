// react & next
import Image from "next/image"
import Link from "next/link"

// actions & utils
import { ArticleProps } from "@/utils/definition"
import { formatDate } from "@/utils/format-date"

// components
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"


export function ArticleCard({ article }: {article: ArticleProps}) {
  return (
    <article className="rounded-lg overflow-hidden bg-white shadow-sm hover:shadow-md dark:hover:shadow-white transition-shadow">
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
          <Avatar className="h-8 w-8">
            <AvatarImage
              src={article.author.avatar}
            />
            <AvatarFallback>
              {article.author.initials}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-wrap items-center gap-2 text-sm text-gray-500">
            <Link
              href={`authors/${article.author.id}`}
              className="hover:text-teal-500"
            >
              <span>{article.author.username}</span>
            </Link>
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
        <p className="text-gray-500 text-sm">{article.excerpt}</p>
      </div>
    </article>
  )
}

