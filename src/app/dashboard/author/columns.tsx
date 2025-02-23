"use client"

// components
import { DeleteArticle, UpdateArticle } from "@/components/ui/custom-button"

// others lib
import { ArticleTableProps } from "@/utils/definition"
import { formatDate } from "@/utils/format-date"
import { ColumnDef } from "@tanstack/react-table"


export const columns: ColumnDef<ArticleTableProps>[] = [
  {
    accessorKey: "title",
    header: "Titre",
  },
  {
    accessorKey: "category",
    header: "Catégorie",
  },
  {
    accessorKey: "createdAt",
    header: "Publié le",
    cell: ({ row }) => {
        const formatted = formatDate(row.getValue('createdAt'))
   
        return <small>{formatted}</small>
    },
  },
  {
    accessorKey: "excerpt",
    header: "Extrait",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const article = row.original
 
      return (
        <div>
            <UpdateArticle slug={article.slug!} />
            <DeleteArticle id={article.id} />
        </div>
      )
    },
  },
]
