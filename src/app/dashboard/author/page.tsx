import { getProfile } from "@/actions/user"
import { DeleteArticle } from "@/components/ui/custom-button"
import { currentUser } from "@clerk/nextjs/server"
import Link from "next/link"


export default async function AuthorBooks() {

    const signedUser = await currentUser()
    const data = await getProfile(signedUser!.id)

    if (data.author?.articles.length === 0) {
        return (
            <div className=" text-center text-2xl">
                <h2>Vous n'avez aucun article écrit</h2>
                <Link href='/dashboard/articles/create'>Ajouter un article</Link>
            </div>
        )
    }

    return (
        <div>
            <Link href='/dashboard/articles/create'>Ajouter un article</Link>
            <div>
                {data.author?.articles.map((article) => (
                    <div
                        key={article.slug}
                        className="m-2 border-2 rounded-md bg-amber-100"
                    >
                        <p>{article.title}</p>
                        <p>{article.category}</p>
                        <br />
                        <Link href={`/dashboard/articles/edit/${article.slug}`}>
                            Modifier l'article
                        </Link> <br />
                        <DeleteArticle
                            id={article.id}
                        />
                    </div>
                ))}
            </div>
        </div>
    )
}
