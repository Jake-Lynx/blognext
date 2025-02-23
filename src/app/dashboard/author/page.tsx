// react & next
import Link from "next/link"

// actions & utils
import { getProfile } from "@/actions/user"
import { ArticleTableProps } from "@/utils/definition"

// others lib
import { currentUser } from "@clerk/nextjs/server"
import { columns } from "./columns"
import { DataTable } from "./data-table"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"


async function getData(): Promise<ArticleTableProps[]> {
    // Fetch data from your API here.
    const signedUser = await currentUser()
    const data = await getProfile(signedUser!.id)

    return data.author?.articles ?? []
}


export default async function AuthorBooks() {
    const data = await getData()

    return (
        <div>
            <div className="flex justify-end">
                <Button asChild>
                    <Link
                        href='/dashboard/articles/create'
                        className="mr-[7rem] mt-2 bg-red-500 hover:bg-red-600"
                    >
                        <Plus /> Ajouter un article
                    </Link>
                </Button>
            </div>
            <div className="container mx-auto py-10">
                <DataTable
                    columns={columns}
                    data={data}
                />
            </div>
        </div>
    )
}
