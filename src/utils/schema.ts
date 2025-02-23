import z from 'zod'

// Article schema & type
export const articleSchema = z.object({
    title: z.string().min(3, "Min 3 caractères pour un titre d'article."),
    content: z.string().min(10, "Que est le contenu de votre article ?"),
    category: z.string().min(1, "Veuillez choisir la catégorie de l'article"),
    cover: z.string().min(3, "Veuillez choisir la couverture de votre article.")
})

export type articleSchemaValues = z.infer<typeof articleSchema>

export const articleSchemaWithId = articleSchema.extend({
    id: z.string()
})

export type articleSchemaWithIdValues = z.infer<typeof articleSchemaWithId>