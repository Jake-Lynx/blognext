'use client'

// react
import React, {useState} from 'react'

// Next
import Image from 'next/image'
import { useRouter } from 'next/navigation'

// Actions
import { creerArticle, modifierArticle } from '@/actions/article'
import {generateContentAI} from '@/actions/googleAI'

// Others lib
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {CldUploadWidget} from 'next-cloudinary'
import { ArticleFormProps, CoverUploadProps } from '@/utils/definition'
import { articleSchema, articleSchemaValues } from '@/utils/schema'
import toast from 'react-hot-toast'
import { generateUnsplashImage } from '@/actions/unsplash'


export default function ArticleForm(
    {mode = 'create', initialData}: ArticleFormProps
) {
    const router = useRouter()

    // States
    const [hostedUrl, setHostedUrl] = useState(initialData?.cover || '')
    const [suggestedCategories, setSuggestedCategories] = useState<string[]>([])
    const [suggestedTitles, setSuggestedTitles] = useState<string[]>([])
    const [loading, setLoading] = useState({name: '', status: false})

    // Config de react hook form
    const {
        register,
        handleSubmit,
        formState: {errors, isSubmitting},
        setValue,
        getValues,
        reset,
        control,
    } = useForm<articleSchemaValues>({
        resolver: zodResolver(articleSchema),
        defaultValues: initialData
    })

    // Generation des suggestions de catégories 
    const generateCategories = async (e: React.MouseEvent<HTMLButtonElement>) => {
        setLoading({name: 'categories', status: true})

        try {
            const {categories} = await generateContentAI(`
                Suggest in french a list of 20 popular and relevant categories for a articleging application, considering current trends and the most searched topics. Ensure the categories cover various fields such as technology, lifestyle, gastronomy, travel, and more.
                No text between parentheses.
                Please return the response in JSON format like this:
                {
                    "categories": ["category 1", "category 2", "category"]
                }
            `)

            setSuggestedCategories(categories)
        } catch (error) {
            console.log(error);
        } finally {
            setLoading({name: 'categories', status: false})
        }
    }

    const handleCategory = (item: string) => {
        setValue('category', item)
    }

    // Generation des suggestions de titres
    const generateTitles = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        const category = getValues('category')

        if (!category) {
            toast.error("Veuillez préciser la catégorie d'abord.")
            return;
        }

        setLoading({name: 'titles', status: true})

        try {
            const {titles} = await generateContentAI(`
                Generate in french 7 SEO-optimized article post titles for the category '${category}'.
                The titles should be engaging, attractive, and based on current trends to maximize organic traffic.
                Use relevant keywords and a tone that encourages clicks.
                If you encounter this format in the generation: "[Critique] *[term of variable1/variable2]* : ... [variable1/variable2]? Our Complete Review!"  
                    1. This process only applies if the given format is followed.
                    2. First, choose whether the title should refer to variable1 or variable2.
                    3. If you choose variable1, replace "[Name of variable1]" with something real and trendy related to ${category}.
                    4. If you choose variable2, replace "[Name of variable2]" with something real and trendy related to ${category}.
                    5. Use real trendy titles related to ${category}.

                Return the response in JSON format like this:
                {
                    "titles": ["Title 1", "Title 2", "Title 3"]
                }
            `)

            setSuggestedTitles(titles)
        } catch (error) {
            console.log(error);
        } finally {
            setLoading({name: 'titles', status: false})
        }

    }

    const handleTitle = (item: string) => {
        setValue('title', item)
    }

    // Generate content
    const generateContent = async () => {
        const category = getValues('category')
        const title = getValues('title')

        if (!category || !title) {
            toast.error('Veuillez préciser le titre et la catégorie')
        }

        setLoading({name: 'content', status: true})

        try {
            const {content} = await generateContentAI(`
                Generate in french an SEO-optimized article post on the topic: ${title}. The content should be written in a clear, engaging, and easy-to-understand language suitable for a broad audience. It must follow best SEO practices and incorporate relevant keywords, while remaining pleasant and readable for human readers."

                🔹 Key Criteria:

                    HTML Structure:

                        - Use HTML to structure the content, excluding unnecessary tags like body, head, main, etc.
                        - Only include essential tags for the structure: h1, h2, h3, p, ul, ol, li, blockquote, code (if applicable), etc.
                        - Use <h1> for the main title and <h2>, <h3> for subheadings. Ensure the title hierarchy is consistent.

                    SEO and Accessibility:

                        - Make sure the article uses relevant SEO keywords naturally, without forcing them into the content.
                        - Include internal links and external links (if necessary) to improve content authority.
                        - Ensure the content is accessible and easy to read, focusing on readability and user experience.
                    
                    Engagement and Readability:

                        - The text should be dynamic and engaging, using a conversational, approachable tone.
                        - Incorporate emojis in titles or content when appropriate to make the article more lively (e.g., emojis like 💡, 🚀, 📈).
                        - Organize the content into clear sections with bullet points for easy skimming and to highlight important points.
                
                    Code and Examples:

                        - Integrate code examples only if necessary and relevant to the subject. Code blocks should be wrapped in the <code> tag and inside a <pre> tag if the example is long.
                        - For instructional or step-by-step content, use numbered lists for clarity.

                    Summary and Conclusion:

                        - At the end of the article, add a brief summary of key takeaways.
                        - Do not include a keyword section or unnecessary tags. Focus on adding value to the reader.

                Return the response in JSON format like this:
                {
                    "content": "<h1>Main Title</h1><p>Engaging content here...</p><h2>Section 1</h2><p>Content here...</p><h3>Key point with code example</h3><pre><code>const example = 'Code here';</code></pre><ul><li>Important point with emoji 🚀</li></ul><p>Summary of key points at the end of the article.</p>"
                }
            `)
            setValue('content', content)   
        } catch (error) {
            console.log(error);
        } finally {
            setLoading({name: 'content', status: false})
        }
    }

    // Génération de la couverture de l'article
    const generateCover = async () => {
        const category = getValues('category')
        const title = getValues('title')
        const content = getValues('content')

        if (!category || !title || !content) {
            toast.error("Vous devez d'abord préciser la catégorie, le titre et le content")
            return;
        }
        setLoading({name: 'cover', status: true})

        try {
            const url = await generateUnsplashImage(title)
            setValue('cover', url)
            setHostedUrl(url)
        } catch (error) {
            console.log(error);
        } finally {
            setLoading({name: 'cover', status: false})
        }
    }

    // Fonction gérant la sauvegarde de l'url de la couverture de l'article
    const handleCover = (results: CoverUploadProps) => {
        const url = typeof results.info === 'object'
            ? results.info.url || ''
            : ''
            
            setValue('cover', url)
            setHostedUrl(url)
    }

    // Gestion de la validation du formulaire
    const onSubmit = async (data: articleSchemaValues) => {        
        try {
            const formData = new FormData()
            Object.entries(data).forEach(([key, value]) => {
                formData.append(key, String(value))
            })
            let response;

            if (mode === 'edit' && initialData?.id) {
                formData.append('id', initialData.id)
                response = await modifierArticle(initialData.id, formData)
            } else {
                response = await creerArticle(formData)
            }

            // Afficher une notification en cas d'erreur
            if (!response.success) {
                toast.error(response.message)
                return;
            }

            // vider les champs
            reset()
            setHostedUrl('')
            setSuggestedCategories([])
            setSuggestedTitles([])

            // Afficher la bonne notification en cas de succès
            if (mode === 'create') {
                toast.success(response.message)
            } else {
                toast.success(response.message)
            }

            // redirection vers la liste des articles
            router.push('/dashboard/articles')

        } catch (error) {
            console.log(error)
            toast.error("Erreur au cours de l'opération. Veuillez réessayer plus tard.")
        }
    }


    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} className='bg-slate-300'>
                <div>
                    <label htmlFor="category">Categorie</label>
                    <input
                        type="text"
                        {...register('category')}
                        className='bg-white border-2'
                    />
                    {errors.category && (<p>{errors.category.message}</p>)}

                    <div>
                        <button
                            type="button"
                            onClick={generateCategories}
                            disabled={loading.name === 'categories' && loading.status}
                        >
                            {loading.name === 'categories' && loading.status
                                ? '(...) '
                                : '[auto] '
                            }
                            Me suggérer des catégories
                        </button>

                        {suggestedCategories.length > 0 && (
                            <>
                                <label>Catégories suggérées</label>
                                <div>
                                    {suggestedCategories.map((item, index) => (
                                        <button
                                            type="button"
                                            key={index}
                                            // variant={category === item ? 'default' : 'outline'}
                                            className='m-1 border-2 cursor-pointer'
                                            onClick={() => handleCategory(item)}
                                        >
                                            {item}
                                        </button>
                                    ))}
                                </div>
                            </>
                        )}
                    </div>
                </div>
                
                <div>
                    <label htmlFor="title">Titre</label>
                    <input
                        type="text"
                        {...register('title')}
                        className='bg-white border-2'
                    />
                    {errors.title && (<p>{errors.title.message}</p>)}

                    <div>
                        <button
                            type="button"
                            onClick={generateTitles}
                            disabled={loading.name === "titles" && loading.status}
                        >
                            {loading.name === 'titles' && loading.status
                                ? '(...) '
                                : '[auto] '
                            }
                            Me suggérer des titres
                        </button>

                        {suggestedTitles.length > 0 && (
                            <>
                                <label>Titres suggérés</label>
                                <div>
                                    {suggestedTitles.map((item, index) => (
                                        <button
                                            key={index}
                                            type="button"
                                            onClick={() => handleTitle(item)}
                                            className='m-1 border-2 rounded-lg'
                                        >
                                            {item}
                                        </button>
                                    ))}
                                </div>
                            </>
                        )}
                    </div>
                </div>
                
                <div>
                    <label htmlFor="content">Contenu</label>
                    <textarea
                        {...register('content')}
                        className='bg-white border-2'
                    ></textarea>
                    {errors.content && (<p>{errors.content.message}</p>)}
                    
                    <br />
                    <button
                        type="button"
                        onClick={generateContent}
                        disabled={loading.name === 'content' && loading.status}
                    >
                        {loading.name === "content" && loading.status
                            ? '(...) '
                            : '[auto] '
                        }
                        Me suggérer mon contenu
                    </button>
                </div>

                <div>
                    <input
                        type="text"
                        hidden
                        {...register('cover')}
                        value={hostedUrl}
                        readOnly
                    />

                    <CldUploadWidget
                        uploadPreset='touristeat_preset'
                        onSuccess={(results) => handleCover(results)}
                        options={{
                            maxFiles: 1,
                            resourceType: 'image',
                            clientAllowedFormats: ['image/png', 'image/jpeg', 'image/jpg', 'image/webp'],
                            maxImageFileSize: 2000000, // 2MB max for image file
                            // Transformation
                            thumbnailTransformation: [
                                {width: 200, height: 200, crop: 'fill'},
                                { quality: "auto" },
                                { fetch_format: "auto" },
                                { dpr: "auto" }
                            ]
                        }}
                    >
                        {({ open, isLoading }) => (
                                <button
                                    className='bg-white p-1 rounded-lg'
                                    onClick={(e) => {
                                        e.preventDefault()
                                        open()
                                    }}
                                    disabled={isLoading}
                                >
                                    Ajouter l'image de l'article
                                </button>
                            )}
                    </CldUploadWidget>
                </div>

                <div>
                    <button
                        type="button"
                        onClick={generateCover}
                        disabled={loading.name === 'cover' && loading.status}
                    >
                        {loading.name === "cover" && loading.status
                            ? '(...) '
                            : '[auto] '
                        }
                        Me suggérer la bonne image
                    </button>
                    {hostedUrl && (
                        <Image
                            src={hostedUrl}
                            alt="couverture de l'article"
                            width={100}
                            height={100}
                        />
                    )}
                </div>

                <button type='submit' className='mt-2 bg-blue-300 rounded-md'>
                    {isSubmitting
                        ? `${mode === 'create' ? 'Ajout' : 'Modification'} en cours...`
                        : mode === 'create'
                            ? "Ajouter l'article"
                            : "Modifier l'article"
                    }
                </button>
            </form>
        </>
    )
}
