// Other lib
import { currentUser } from '@clerk/nextjs/server'
import prisma from '@/lib/prisma';


// Génération des initiales de l'utilisateur
const getInitials = (name: string): string => {
    const words = name.split(' ')
    const initials = words.map((word) => word.charAt(0).toUpperCase())

    return initials.slice(0, 2).join("")
}

// Vérifier l'utilisateur et l'enregistrer
// si pas encore dans la base de donnée
export const checkUser = async () => {
    const signedUser = await currentUser()

    if (!signedUser) {
        throw new Error("Utilisateur non connecté.");
    }

    // Vérifier que l'utilisateur existe dans la base de donnée, sinon, le créer
    let user = await prisma.user.findUnique({
        where: {clerkId: signedUser.id}
    })

    if (!user) {
        const userInitials = getInitials(signedUser.username as string) || '?'

        user = await prisma.user.create({
            data: {
                clerkId: signedUser.id,
                email: signedUser.emailAddresses[0]?.emailAddress || '',
                username: signedUser.username || '',
                initials: userInitials,
                avatar: signedUser.imageUrl || 'default.jpg'
            }
        })
    }

    return user
}

// Récupérer tous les auteurs (les users ayant au moins écrit un livre)
export const getAllAuthors = async () => {
    try {
        const authors = await prisma.user.findMany({
            where: {
                articles: {
                    some: {}
                }
            }
        })

        return authors
    } catch (error) {
        console.log(error);
        throw new Error("Echec de récupération des auteurs. Veuillez réessayer plus tard.");
        
    }
}

// Récupérer un utilisateur
export const getAuthor = async (id: string) => {
    try {
        const author = await prisma.user.findUnique({
            where: {
                id: id
            },
            select: {
                email: true,
                username: true,
                avatar: true,
                articles: {
                    select: {
                        id: true,
                        slug: true,
                        title: true,
                        cover: true,
                        category: true,
                        createdAt: true
                    }
                }
            }
        })

        if (!author) {
            return {
                success: true,
                message: "Utilisateur introuvable"
            }
        }

        return {
            success: true,
            message: `Bienvenue sur le profile de ${author?.username}.`,
            author
        }
    } catch (error) {
        console.log(error);
        return {
            success: false,
            message: "Utilisateur introuvable."
        }
    }
}

export const getProfile = async (clerkId: string) => {
    try {
        const author = await prisma.user.findUnique({
            where: {
                clerkId: clerkId
            },
            select: {
                email: true,
                username: true,
                avatar: true,
                articles: {
                    select: {
                        id: true,
                        slug: true,
                        title: true,
                        cover: true,
                        category: true,
                        createdAt: true,
                        excerpt: true,
                    }
                }
            }
        })

        if (!author) {
            return {
                success: true,
                message: "Utilisateur introuvable"
            }
        }

        return {
            success: true,
            message: `Bienvenue sur le profile de ${author?.username}.`,
            author
        }
    } catch (error) {
        return {
            success: false,
            message: "Utilisateur introuvable."
        }
    }
}