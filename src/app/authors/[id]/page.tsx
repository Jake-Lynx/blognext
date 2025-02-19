import { getAuthor } from '@/actions/user'
import Image from 'next/image';
import React from 'react'

import Link from 'next/link';

export default async function AuthorPage(
    {params}: {params: Promise<{id: string}>}
) {
    const authorId = (await params).id
    const data = await getAuthor(authorId)

    if (!data.author) {
        console.log("Auteur introuvable");
        return;
    }

    return (
        <div>
            <Image
                src={data.author.avatar as string}
                alt={data.author.username as string}
                className='rounded-full'
                width={200}
                height={200}
            />

            <h2 className='text-center mb-2'>
                {data.author.username}
            </h2>
            
            <div className='flex mt-3'>
                {data.author.articles
                    ? data.author.articles.map((article) => (
                        <div key={article.slug}>
                            <Link href={`/articles/${article.slug}`}>
                                <Image
                                    src={article.cover}
                                    alt={article.title}
                                    width={150}
                                    height={150}
                                />
                                <p>{article.title}</p>
                                <p>{article.category}</p>
                            </Link>
                        </div>
                        ))
                    : <div>
                        Aucun article écrit pour l'instant
                    </div>
                }
            </div>

        </div>
    )
}
