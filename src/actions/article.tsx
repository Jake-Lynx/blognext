'use server'

// Next
import { unstable_cache, revalidateTag } from 'next/cache'

// Others lib
import prisma from '@/lib/prisma'
import { articleSchema } from '@/utils/schema'
import slugify from 'react-slugify'
import { checkUser } from './user'

// Création du résumé de l'article
const generateExcerpt = (content: string) => {
    const maxLength = 160;

    // Supprime toutes les balises HTML avec une regex
    const formatTag = content.replace(/<[^>]*>/g, '');

    // Supprime les emojis (basé sur les plages Unicode des emojis)
    const cleanContent = formatTag.replace(
        /[\u{1F300}-\u{1F6FF}\u{1F900}-\u{1F9FF}\u{1F1E0}-\u{1F1FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{FE0F}]/gu,
        ''
    );

    return cleanContent.length > maxLength
        ? cleanContent.slice(0, maxLength) + '...'
        : cleanContent
}

// Créer un article
export const creerArticle = async (formData: FormData) => {
    try {
        // Enregistrer les données en base de donnée
        const data = Object.fromEntries(formData.entries()) as Record<string, string>
        console.log(data);
        

        const articleSlug = slugify(data.title) // Création du slug de l'article


        const parsedData = articleSchema.parse({
            title: data.title,
            content: data.content,
            cover: data.cover,
            category: data.category
        })

        // Récupérer l'utilisateur connecté
        const user = await checkUser() 

        const article = await prisma.article.create({
            data: {
                ...parsedData,
                slug: articleSlug,
                excerpt: generateExcerpt(data.content),
                authorId: user.id
            }
        })

        // revalider et update le cache
        revalidateTag('articles')

        // Retourner un objet de succès
        return {
            success: true,
            message: "Article ajouté avec succès",
            data: article
        }

    } catch (error) {
        console.log("error: ", error)
        return {
            success: false,
            message: "Erreur dans la création de l'article. Veuillez réessayer plus tard."
        }
    }
}

// Afficher tous les articles
export const getArticles = unstable_cache (
    async () => {
        try {
            // Récupérer les articles par ordre d'ajout décroissant et en ne gardant que quelques propriétés
            const articles = prisma.article.findMany({
                orderBy: {createdAt: 'desc'},
                select: {
                    id: true,
                    title: true,
                    slug: true,
                    excerpt: true,
                    cover: true,
                    category: true,
                    createdAt: true,
                    author: {
                        select: {
                            id: true,
                            clerkId: true,
                            username: true,
                            initials: true,
                            avatar: true,
                        }
                    }
                }
            });
            
            return await articles
        } catch (error) {
            console.log("Erreur: ", error)
            throw new Error(`Erreur lors de la récupération des articles: ${error}`);
        }
    },
    ['article-list'], // Attribuons un cache
    {
        revalidate: 3600 * 5, // revalider les données chaque 5h
        tags: ['articles']   
    }
)

// Récuperer tous les articles et les paginer
export const getArticlesPaginated = unstable_cache(
    async (
        currentPage: number = 1,
        pageSize: number = 3, // as eg
        query?: string
    ) => {
        const skip = (currentPage - 1) * pageSize

        // Faire une recherche sur le titre, la catégorie
        const searchQuery = {
            OR: [
                {
                    title: {
                        contains: query,
                        mode: 'insensitive' as const
                    }
                },
                {
                    category: {
                        contains: query,
                        mode: 'insensitive' as const
                    }
                }
            ]
        }

        try {
            const [articles, totalArticles] = await Promise.all([
                prisma.article.findMany({
                    where: searchQuery,
                    skip,
                    take: pageSize,
                    orderBy: {createdAt: 'desc'},
                    select: {
                        id: true,
                        title: true,
                        slug: true,
                        excerpt: true,
                        cover: true,
                        category: true,
                        createdAt: true,
                        author: {
                            select: {
                                id: true,
                                clerkId: true,
                                username: true,
                                initials: true,
                                avatar: true
                            }
                        },
                    }
                }),
                prisma.article.count({where: searchQuery})
            ])

            const totalPages = Math.ceil(totalArticles / pageSize)

            return {articles, totalArticles, totalPages}
        } catch (error) {
            console.log("erreur: ", error)
            throw new Error(`Erreur lors de la récupération des articles: ${error}`);
        }
    },
    ['articles-paginated'], // Ajouter la clé du cache
    {
        revalidate: 3600 * 5, // revalider le cache chaque 5h
        tags: ['articles'] // Appliquer un tag pour le lier à un cache global de d'articles
    }

)

// Récupérer les 4 derniers articles
export const getLastArticles = unstable_cache(
    async () => {
        try {
            const latestArticles = await prisma.article.findMany({
                orderBy: {createdAt: 'desc'},
                select: {
                    id: true,
                    title: true,
                    slug: true,
                    excerpt: true,
                    cover: true,
                    category: true,
                    createdAt: true,
                    author: {
                        select: {
                            id: true,
                            username: true,
                            avatar: true,
                            initials: true,
                        }
                    },
                },
                take: 5
            })

            return latestArticles
        } catch (error) {
            console.log("Erreur: ", error)
            throw new Error("Erreur dans la récupération des derniers articles. Veuillez vérifier votre connexion internet et recharger la page.");
        }
    },
    ['articles-lastest'],
    {
        revalidate: 3600 * 5,
        tags: ['articles']
    }
)

// Récupérer un seul article
export const getArticleBySlug = async (slug: string) => {
    try {
        const article = await prisma.article.findUnique({
            where: {
                slug: slug
            },
            include: {
                author: {
                    select: {
                        id: true,
                        clerkId: true,
                        username: true,
                        avatar: true,
                        initials: true,
                    }
                }
            }
        })

        return article
    } catch (error) {
        console.log("Erreur: ", error)
        throw new Error(`Erreur lors de la récupération de l'article: ${error}`);
        
    }
}

// Modifier un article
export const modifierArticle = async (
    id: string,
    formData: FormData
) => {
    try {
        const data = Object.fromEntries(formData.entries()) as Record<string, string>

        // Créer un nouveau slug au cas où le titre de l'article changerait
        const articleSlug = slugify(data.title)

        // Vérification de l'intégrité des données
        const parsedArticle = articleSchema.parse({
            title: data.title,
            content: data.content,
            cover: data.cover,
            category: data.category
        })

        // Récupérer l'utilisateur connecté
        const user = await checkUser()

        // Veuillez à ce que la suppression d'un article soit reservé à son auteur
        const article = await prisma.article.findUnique({
            where: {id: id}
        })
        if (article && article.authorId !== user.id) {
            console.log("Désolé, seul l'auteur d'un article peut le modier");
            return {
                success: false,
                message: "Désolé, seul l'auteur d'un article peut le modifier."
            }
        }

        const updatedArticle = await prisma.article.update({
            where: {
                id: id
            },
            data: {
                ...parsedArticle,
                slug: articleSlug,
                excerpt: generateExcerpt(data.content),
                authorId: user.id
            }
        })

        // Revalidation du cache
        revalidateTag('articles')

        return {
            success: true,
            message: "L'article a bien été modifié!",
            data: updatedArticle
        }

    } catch (error) {
        console.log("Erreur: ", error);
        
        return {
            success: false,
            message: `Erreur lors de la modification de l'article. Veuillez réessayer plus tard`
        }
    }
}

// Suppression d'un article
export const supprimerArticle = async (id: string) => {
    try {
        // Veuillez à ce que la suppression d'un article soit reservé à son auteur
        const user = await checkUser()
        const article = await prisma.article.findUnique({
            where: {id: id}
        })
        if (article && article.authorId !== user.id) {
            return {
                success: false,
                message: "Désolé, seul l'auteur d'un article peut le supprimer."
            }
        }

        await prisma.article.delete({
            where: {
                id: id
            }
        })

        // Revalidation du cache
        revalidateTag('articles')

        return {
            success: true,
            message: "Article supprimé avec succès !"
        }
    } catch (error) {
        console.log("Erreur: ", error)
        return {
            success: false,
            message: "Echec de la suppression de l'article. Veuillez réessayer plus tard."
        }
    }
}