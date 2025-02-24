// next
import Image from "next/image"
import Link from "next/link"

// actions & utils
import { ArticleProps } from "@/utils/definition"
import { formatDate } from "@/utils/format-date"


export default function HeroSection(
    {article}: {article: ArticleProps}
) {
    return (
        <>
            <section className="py-12 md:py-20">
                <div className="container mx-auto px-4">
                    <article className="group">
                        <div className="mb-6 text-center">
                            <h2 className="mt-2 text-2xl font-semibold">
                                {article.title}
                            </h2>
                            <div
                                className="mt-4 flex justify-center gap-2"
                            >
                                <Image
                                    src={article.author.avatar}
                                    alt={article.author.username}
                                    width={25}
                                    height={25} 
                                    className="block rounded-full"
                                    loading="lazy"
                                    quality={75}
                                />
                                <div className="flex justify-center items-center gap-2 text-gray-500">
                                    <p className="font-medium hover:text-teal-500">
                                        <Link
                                            href={`/authors/${article.author.id}`}
                                        >
                                            {article.author.username}
                                        </Link>
                                    </p>
                                    <p className="text-sm text-gray-500">
                                        {formatDate(article.createdAt)}
                                    </p>
                                    <p
                                        className="text-sm text-gray-500 hover:text-teal-500"
                                    >
                                        {article.category}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="relative aspect-[16/9] overflow-hidden rounded-lg">
                            <Image
                                src={article.cover}
                                alt={`image de l'article ${article.title}`}
                                fill
                                className="object-cover transition-transform duration-300 group-hover:scale-105"
                                loading="lazy"
                                quality={75}
                            />
                        </div>
                    </article>
                </div>
            </section>
        </>
    )
}
