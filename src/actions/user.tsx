// Other lib
import { currentUser } from '@clerk/nextjs/server'
import prisma from '@/lib/prisma';


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
        user = await prisma.user.create({
            data: {
                clerkId: signedUser.id,
                email: signedUser.emailAddresses[0]?.emailAddress || '',
                username: signedUser.username || '',
                avatar: signedUser.imageUrl || ''
            }
        })
    }

    return user
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
                        category: true
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
                        category: true
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