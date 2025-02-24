// react & next
import Image from "next/image"
import Link from "next/link"

// actions & utils
import { formatDate } from "@/utils/format-date"
import { ArticleProps } from "@/utils/definition"

// components
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"


export function FeaturedArticle(
  {article}: {article: ArticleProps}
) {
  return (
    <article className="rounded-lg overflow-hidden bg-white dark:bg-gray-900 dark:border-2 dark:border-white">
      <Link href={`/articles/${article.slug}`}>
        <div className="relative">
          <Image
            src={article.cover}
            alt={`Image de couverture de l'article ${article.title}`}
            width={1200}
            height={600}
            className="w-full object-cover aspect-[2/1]"
            loading="lazy"
            quality={75}  // Réduit la taille de l'image
          />
        </div>
      </Link>
      <div className="mt-4 md:mt-6 px-4 md:px-0">
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
              <span className="dark:text-white">{article.author.username}</span>
            </Link>
            <span className="dark:text-white">{formatDate(article.createdAt)}</span>
            <span className="text-teal-500">{article.category}</span>
          </div>
        </div>
        <h1 className="text-xl md:text-2xl font-bold mb-3">
          <Link
            href={`/articles/${article.slug}`}
            className="hover:text-teal-500">
            {article.title}
          </Link>
        </h1>
        <p className="text-sm md:text-base text-muted-foreground">
          {article.excerpt}
        </p>
      </div>
    </article>
  )
}

