'use client'

// react
import React, {useState} from 'react'

// Next
import Image from 'next/image'
import { useRouter } from 'next/navigation'

// Others lib
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {CldUploadWidget} from 'next-cloudinary'
import { BlogFormProps, CoverUploadProps } from '@/utils/definition'
import { blogSchema, blogSchemaValues } from '@/utils/schema'
import toast from 'react-hot-toast'
import { creerBlog, modifierBlog } from '@/actions/blog'


export default function BlogForm(
    {mode = 'create', initialData}: BlogFormProps
) {
    const router = useRouter()

    // States
    const [hostedUrl, setHostedUrl] = useState(initialData?.cover || '')
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
    } = useForm<blogSchemaValues>({
        resolver: zodResolver(blogSchema),
        defaultValues: initialData
    })

    // Fonction gérant la sauvegarde de l'url de la couverture de l'article
    const handleCover = (results: CoverUploadProps) => {
        const url = typeof results.info === 'object'
            ? results.info.url || ''
            : ''
            
            setValue('cover', url)
            setHostedUrl(url)
    }

    // generate category


    // Generate title


    // Generate content



    // Gestion de la validation du formulaire
    const onSubmit = async (data: blogSchemaValues) => {
        try {
            const formData = new FormData()
            Object.entries(data).forEach(([key, value]) => {
                formData.append(key, String(value))
            })
            let response;

            if (mode === 'edit' && initialData?.id) {
                formData.append('id', initialData.id)
                response = await modifierBlog(initialData.id, formData)
            } else {
                response = await creerBlog(formData)
            }

            // Afficher une notification en cas d'erreur
            if (!response.success) {
                toast.error(response.message)
                return;
            }

            // vider les champs
            reset()
            setHostedUrl('')

            // Afficher la bonne notification en cas de succès
            if (mode === 'create') {
                toast.success(response.message)
            } else {
                toast.success(response.message)
            }

            // redirection vers la liste des articles
            router.push('/dashboard/blogs')

        } catch (error) {
            console.log(error)
            toast.error("Erreur au cours de l'opération. Veuillez réessayer plus tard.")
        }
    }


    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} className='bg-slate-300'>
                <div>
                    <label htmlFor="title">Titre</label>
                    <input
                        type="text"
                        {...register('title')}
                        className='bg-white border-2'
                    />
                    {errors.title && (<p>{errors.title.message}</p>)}
                </div>
                <div>
                    <label htmlFor="category">Categorie</label>
                    <input
                        type="text"
                        {...register('category')}
                        className='bg-white border-2'
                    />
                    {errors.category && (<p>{errors.category.message}</p>)}
                </div>
                <div>
                    <label htmlFor="content">Contenu</label>
                    <textarea
                        {...register('content')}
                        className='bg-white border-2'
                    ></textarea>
                    {errors.content && (<p>{errors.content.message}</p>)}
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
                    {mode === 'create'
                        ? "Ajouter l'article"
                        : "Modifier l'article"
                    }
                </button>
            </form>
        </>
    )
}
