'use client'

// react & next
import { useRouter } from 'next/navigation'

// actions
import { supprimerArticle } from '@/actions/article'

// components
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"

// others lib
import toast from 'react-hot-toast'
import { Pencil, Trash } from 'lucide-react'
import Link from 'next/link'


export function DeleteArticle(
    {id}: {id: string}
) {
    const router = useRouter()

    const handleClick = async () => {
        // Informer l'utilisateur de la suppression en cours
        const loadingToast = toast.loading('Suppression en cours...')

        const response = await supprimerArticle(id)

        if (response?.success) {
            toast.success(response.message)
        } else {
            toast.error(response.message)
        }

        // Stopper le toast de chargement
        toast.dismiss(loadingToast)
        
        router.push('/dashboard/author')
    }

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button variant="ghost" className='inline-flex justify-center'>
                    <Trash color="#ff0000"/> Supprimer l'article
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        Suppression de l'article
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        Voulez-vous réellement supprimer l'article ?
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>
                        Annuler
                    </AlertDialogCancel>
                    <AlertDialogAction onClick={handleClick}>
                        Supprimer
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export function UpdateArticle(
    {slug}: {slug: string}
) {
    return (
        <Button
            asChild
            variant="ghost"
            className='inline-flex justify-center'
        >
            <Link href={`/dashboard/articles/edit/${slug}`}>
                <Pencil /> Modifier l'article
            </Link>
        </Button>
    )
}
