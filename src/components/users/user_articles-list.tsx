// components
import { UserArticleProps } from '@/utils/definition'
import { UserArticleCard } from './user-article-card'

export default async function UserArticlesList(
    {articles}: {articles: UserArticleProps[]}
) {
    return (
        <div className='flex flew-wrap gap-7 px-5'>
            {articles.map((article) => (
                <UserArticleCard
                    key={article.id}
                    article={article}
                />
            ))}
        </div>
    )
}
