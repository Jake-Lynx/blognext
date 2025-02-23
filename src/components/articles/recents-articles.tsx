// react & next
import Image from "next/image"

// actions & utils
import { getLastArticles } from "@/actions/article"
import { formatDate } from "@/utils/format-date"

// components
import ScrollToTopLink from "../ui/scroll-to-top-link"


export default async function RecentsArticles() {

  const articles = await getLastArticles()

  return (
    <>
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl text-center font-semibold mt-10">
            Articles récents
          </h2>
          <div className="flex flex-wrap justify-between mt-5">
            {articles?.slice(1, 4).map((article) => (
              <article
                key={article.id}
                className="group w-[300px] gap-3"
              >
                <div className="flex flex-col md:flex-row gap-6">
                  <div
                    className="relative w-[300px] h-[200px] overflow-hidden rounded-lg"
                  >
                    <Image
                      src={article.cover}
                      alt={article.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                </div>
                <div className="mb-4">
                  <span className="text-gray-500 text-sm">
                    {formatDate(article.createdAt)} |
                  </span>
                  <span className="text-gray-500 text-sm pl-1">
                    {article.category}
                  </span>

                  <ScrollToTopLink slug={article.slug}>
                    <h3> {article.title} </h3>
                  </ScrollToTopLink>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
