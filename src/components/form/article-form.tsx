'use client'

// react
import React, {useState} from 'react'

// Next
import Image from 'next/image'
import { useRouter } from 'next/navigation'

// Icons
import { AlertCircle, Bot, ImageIcon, LoaderPinwheel, Zap } from "lucide-react"

// Actions & utils & lib
import { creerArticle, modifierArticle } from '@/actions/article'
import {generateContentAI} from '@/actions/googleAI'
import { ArticleFormProps, CoverUploadProps } from '@/utils/definition'
import { articleSchema, articleSchemaValues } from '@/utils/schema'

// Others lib
import toast from 'react-hot-toast'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { CldUploadButton } from 'next-cloudinary'
import { generateUnsplashImage } from '@/actions/unsplash'
import clsx from 'clsx'

// components
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from "@/components/ui/button"
import TipTapEditor from '../ui/tiptap'


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
        watch,
    } = useForm<articleSchemaValues>({
        resolver: zodResolver(articleSchema),
        defaultValues: initialData
    })

    // Generation des suggestions de catégories 
    const generateCategories = async (e: React.MouseEvent<HTMLButtonElement>) => {
        setLoading({name: 'categories', status: true})

        try {
            const {categories} = await generateContentAI(`
                Suggest in french a list of 10 popular and relevant categories for a articleging application, considering current trends and the most searched topics. Ensure the categories cover various fields such as technology, lifestyle, gastronomy, travel, and more.
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
            return;
        }

        setLoading({name: 'content', status: true})

        try {
            const {content} = await generateContentAI(`
                Generate in french an SEO-optimized article post on the topic: ${title}. The content should be written in a clear, engaging, and easy-to-understand language suitable for a broad audience. It must follow best SEO practices and incorporate relevant keywords, while remaining pleasant and readable for human readers. Don't repeat ${title} in article."

                🔹 Key Criteria:

                    HTML Structure:

                        - Use HTML to structure the content, excluding unnecessary tags like body, head, main, etc.
                        - Only include essential tags for the structure: h1, h2, h3, p, ul, ol, li, blockquote, code (only if applicable, for example in article about technology), etc.
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
            toast.success(response.message)

            // redirection vers la liste des articles
            router.push('/dashboard/author')

        } catch (error) {
            console.log(error)
            toast.error("Erreur au cours de l'opération. Veuillez réessayer plus tard.")
        }
    }

    return (
        <>
            <div className="min-h-screen bg-gray-50 py-12 dark:bg-gray-900">
                <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800 sm:p-8"
                    >
                        <h2
                            className="mb-6 text-2xl font-bold text-gray-900 dark:text-white inline-flex justify-center items-center text-center gap-2"
                        >
                            Edite ton article 3x plus vite ici <Zap />
                        </h2>

                        {/* Catégorie */}
                        <section>
                            <div className="mb-6">
                                <Label htmlFor="category" className="mb-2 block">
                                    Catégorie
                                </Label>
                                <Input
                                    id="category"
                                    type="text"
                                    {...register('category')}
                                    className={clsx(
                                        "dark:border-white",
                                        errors.category
                                        ? "border-red-500 focus-visible:ring-red-500"
                                        : "border-gray-200 focus-visible:ring-primary"
                                    )}
                                    placeholder="La catégorie de ton article"
                                />
                                {errors.category && (
                                    <div className="mt-2 flex items-center gap-x-1 text-sm text-red-500">
                                        <AlertCircle className="h-4 w-4" />
                                        <span>{errors.category.message}</span>
                                    </div>
                                )}
                            </div>
                            <div
                                className="mb-6 rounded-lg bg-gray-50 p-4 dark:bg-gray-700"
                            >
                                <Button
                                    type="button"
                                    className='mb-3'
                                    onClick={generateCategories}
                                    disabled={loading.name === 'categories' && loading.status}
                                >
                                    {loading.name === 'categories' && loading.status
                                        ? <LoaderPinwheel className="animate-spin" />
                                        : <Bot />
                                    }
                                    Me suggérer des catégories
                                </Button>
                                <div
                                    className="text-sm text-gray-600 dark:text-gray-300"
                                >
                                    {suggestedCategories.length > 0 && (
                                        <>
                                            <Label>Catégories suggérées</Label>
                                            <div>
                                                {suggestedCategories.map((item, index) => (
                                                    <Button
                                                        type="button"
                                                        key={index}
                                                        variant={watch('category') === item 
                                                            ? 'default'
                                                            : 'outline'
                                                        }
                                                        className='m-1 border-2 cursor-pointer'
                                                        onClick={() => handleCategory(item)}
                                                    >
                                                        {item}
                                                    </Button>
                                                ))}
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>
                        </section>

                        {/* Titre */}
                        <section>
                            <div className="mb-6">
                                <Label htmlFor="title" className="mb-2 block">
                                    Titre
                                </Label>
                                <Input
                                    id="title"
                                    type="text"
                                    {...register('title')}
                                    className={clsx(
                                        "dark:border-white",
                                        errors.title
                                        ? "border-red-500 focus-visible:ring-red-500"
                                        : "border-gray-200 focus-visible:ring-primary"
                                    )}
                                    placeholder="Le titre ton article"
                                />
                                {errors.title && (
                                    <div className="mt-2 flex items-center gap-x-1 text-sm text-red-500">
                                        <AlertCircle className="h-4 w-4" />
                                        <span>{errors.title.message}</span>
                                    </div>
                                )}
                            </div>
                            <div
                                className="mb-6 rounded-lg bg-gray-50 p-4 dark:bg-gray-700"
                            >
                                <Button
                                    type="button"
                                    className='mb-3'
                                    onClick={generateTitles}
                                    disabled={loading.name === 'titles' && loading.status}
                                >
                                    {loading.name === 'titles' && loading.status
                                        ? <LoaderPinwheel className="animate-spin" />
                                        : <Bot />
                                    }
                                    Me suggérer des titres
                                </Button>
                                <div
                                    className="text-sm text-gray-600 dark:text-gray-300"
                                >
                                    {suggestedTitles.length > 0 && (
                                        <>
                                            <label>Titres suggérées</label>
                                            <div>
                                                {suggestedTitles.map((item, index) => (
                                                    <Button
                                                        type="button"
                                                        key={index}
                                                        variant={watch('title') === item 
                                                            ? 'default'
                                                            : 'outline'
                                                        }
                                                        className='m-1 p-6 text-wrap border-2 cursor-pointer'
                                                        onClick={() => handleTitle(item)}
                                                    >
                                                        {item}
                                                    </Button>
                                                ))}
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>
                        </section>

                        {/* Message */}
                        <section>
                            <div className="mb-6">
                                <Label htmlFor="content" className="mb-2 block">
                                    Contenu de l'article
                                </Label>
                                <TipTapEditor
                                    name='content'
                                    control={control}
                                    errors={errors}
                                    placeholder='Rédige ton article'
                                />
                                {errors.content && (
                                    <div className="mt-2 flex items-center gap-x-1 text-sm text-red-500">
                                        <AlertCircle className="h-4 w-4" />
                                        <span>{errors.content.message}</span>
                                    </div>
                                )}
                            </div>
                            <Button
                                type="button"
                                className='mb-3'
                                onClick={generateContent}
                                disabled={loading.name === 'content' && loading.status}
                            >
                                {loading.name === 'content' && loading.status
                                    ? <LoaderPinwheel className="animate-spin" />
                                    : <Bot />
                                }
                                Me suggérer un article
                            </Button>
                        </section>

                        {/* Image Upload */}
                        <div className="mb-6">
                            <Label htmlFor="image" className="mb-2 block">
                                Couverture de l'article
                            </Label>
                            <div className="rounded-lg border-2 border-dashed border-gray-200 p-4 dark:border-gray-700">
                                <input
                                    type="text"
                                    hidden
                                    {...register('cover')}
                                    value={hostedUrl}
                                    readOnly
                                />
                                <div className="flex flex-col items-center">
                                    {hostedUrl ? (
                                        <Image
                                            src={hostedUrl || "/placeholder.svg"}
                                            alt="Aperçu de l'image de l'article"
                                            className="mb-4 h-400 w-auto rounded-lg object-cover"
                                            width={1080}
                                            height={400}
                                        />
                                    ) : (
                                    <ImageIcon className="mb-4 h-12 w-12 text-gray-400" />
                                    )}
                                    <CldUploadButton
                                        uploadPreset="touristeat_preset"
                                        onSuccess={(results) => handleCover(results)}
                                        className=' px-4 py-1 border-2 border-gray-800 rounded-md hover:bg-gray-400'
                                    >
                                        📸 Ajouter une image
                                    </CldUploadButton>

                                    <Button
                                        type="button"
                                        className='mb-3 mt-2'
                                        onClick={generateCover}
                                        disabled={loading.name === 'cover' && loading.status}
                                    >
                                        {loading.name === 'cover' && loading.status
                                            ? <LoaderPinwheel className="animate-spin" />
                                            : <Bot />
                                        }
                                        Me suggérer une image
                                    </Button>
                                    {errors.cover && (
                                        <div className="mt-2 flex items-center gap-x-1 text-sm text-red-500">
                                            <AlertCircle className="h-4 w-4" />
                                            <span>{errors.cover.message}</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Boutons */}
                        <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
                            <Button variant="outline" type="button">
                                Annuler
                            </Button>
                            <Button
                                type="submit"
                                className='bg-blue-500 hover:bg-blue-600'
                            >
                                {isSubmitting
                                    ? `${mode === 'create' ? 'Ajout' : 'Modification'} en cours...`
                                    : mode === 'create'
                                        ? "Ajouter l'article"
                                        : "Modifier l'article"
                                }
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}
