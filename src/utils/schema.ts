import z from 'zod'

// Blog schema & type
export const blogSchema = z.object({
    title: z.string().min(3, "Min 3 caractères pour un titre d'article."),
    content: z.string().min(10, "Que est le contenu de votre article ?"),
    category: z.string().min(1, "Veuillez choisir la catégorie de l'article"),
    cover: z.string().min(3, "Veuillez choisir la couverture de votre article.")
})

export type blogSchemaValues = z.infer<typeof blogSchema>

export const blogSchemaWithId = blogSchema.extend({
    id: z.string()
})

export type blogSchemaWithIdValues = z.infer<typeof blogSchemaWithId>