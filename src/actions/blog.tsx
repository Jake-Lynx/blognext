'use server'

// Next
import { unstable_cache, revalidateTag } from 'next/cache'

// Others lib
import prisma from '@/lib/prisma'
import { blogSchema } from '@/utils/schema'
import slugify from 'react-slugify'


// Création du résumé de l'article
const generateResume = (content: string) => {
    const maxLength = 160;

    return content.length > maxLength
        ? content.slice(0, maxLength) + '...'
        : content
}

// Créer un blog
export const creerBlog = async (formData: FormData) => {
    try {
        // Enregistrer les données en base de donnée
        const data = Object.fromEntries(formData.entries()) as Record<string, string>

        const blogSlug = slugify(data.title) // Création du slug de l'article


        const parsedData = blogSchema.parse({
            title: data.title,
            content: data.content,
            cover: data.cover,
            category: data.category
        })

        const blog = await prisma.blog.create({
            data: {
                ...parsedData,
                slug: blogSlug,
                resume: generateResume(data.content)
            }
        })

        // revalider et update le cache
        revalidateTag('blogs')

        // Retourner un objet de succès
        return {
            success: true,
            message: "Article ajouté avec succès",
            data: blog
        }


    } catch (error) {
        console.log("error: ", error)
        return {
            success: false,
            message: "Erreur dans la création de l'article. Veuillez réessayer plus tard."
        }
    }
}

// Afficher tous les blogs
export const getBlogs = unstable_cache (
    async () => {
        try {
            // Récupérer les blogs par ordre d'ajout décroissant et en ne gardant que quelques propriétés
            const blogs = prisma.blog.findMany({
                orderBy: {createdAt: 'desc'},
                select: {
                    id: true,
                    title: true,
                    slug: true,
                    resume: true,
                    cover: true,
                    category: true,
                    createdAt: true
                }
            });
            
            return await blogs
        } catch (error) {
            console.log("Erreur: ", error)
            throw new Error(`Erreur lors de la récupération des articles: ${error}`);
        }
    },
    ['blog-list'], // Attribuons un cache
    {
        revalidate: 3600 * 5, // revalider les données chaque 5h
        tags: ['blogs']   
    }
)

// Récuperer tous les articles et les paginer
export const getBlogsPaginated = unstable_cache(
    async (
        currentPage: number = 1,
        pageSize: number = 3,
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
            const [blogs, totalBlogs] = await Promise.all([
                prisma.blog.findMany({
                    where: searchQuery,
                    skip,
                    take: pageSize,
                    orderBy: {createdAt: 'desc'},
                    select: {
                        id: true,
                        title: true,
                        slug: true,
                        resume: true,
                        cover: true,
                        category: true,
                        createdAt: true
                    }
                }),
                prisma.blog.count({where: searchQuery})
            ])

            const totalPages = Math.ceil(totalBlogs / pageSize)

            return {blogs, totalBlogs, totalPages}
        } catch (error) {
            console.log("erreur: ", error)
            throw new Error(`Erreur lors de la récupération des articles: ${error}`);
        }
    },
    ['blogs-paginated'], // Ajouter la clé du cache
    {
        revalidate: 3600 * 5, // revalider le cache chaque 5h
        tags: ['blogs'] // Appliquer un tag pour le lier à un cache global de d'articles
    }

)

// Récupérer les 4 derniers articles
export const getLastBlogs = unstable_cache(
    async () => {
        try {
            const latestBlogs = await prisma.blog.findMany({
                orderBy: {createdAt: 'desc'},
                select: {
                    id: true,
                    title: true,
                    slug: true,
                    resume: true,
                    cover: true,
                    category: true,
                    createdAt: true
                },
                take: 4
            })

            return latestBlogs
        } catch (error) {
            console.log("Erreur: ", error)
            throw new Error("Erreur dans la récupération des derniers articles. Veuillez vérifier votre connexion internet et recharger la page.");
        }
    },
    ['blogs-lastest'],
    {
        revalidate: 3600 * 5,
        tags: ['blogs']
    }
)

// Récupérer un seul article
export const getBlogBySlug = async (slug: string) => {
    try {
        const blog = await prisma.blog.findUnique({
            where: {
                slug: slug
            }
        })

        return blog
    } catch (error) {
        console.log("Erreur: ", error)
        throw new Error(`Erreur lors de la récupération de l'article: ${error}`);
        
    }
}

// Modifier un article
export const modifierBlog = async (
    id: string,
    formData: FormData
) => {
    try {
        const data = Object.fromEntries(formData.entries()) as Record<string, string>

        // Créer un nouveau slug au cas où le titre de l'article changerait
        const blogSlug = slugify(data.title)

        // Vérification de l'intégrité des données
        const parsedBlog = blogSchema.parse({
            title: data.title,
            content: data.content,
            cover: data.cover,
            category: data.category
        })

        const updatedBlog = await prisma.blog.update({
            where: {
                id: id
            },
            data: {
                ...parsedBlog,
                slug: blogSlug,
                resume: generateResume(data.content)
            }
        })

        // Revalidation du cache
        revalidateTag('blogs')

        return {
            success: true,
            message: "L'article a bien été modifié!",
            data: updatedBlog
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
export const supprimerBlog = async (id: string) => {
    try {
        await prisma.blog.delete({
            where: {
                id: id
            }
        })

        // Revalidation du cache
        revalidateTag('blogs')

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