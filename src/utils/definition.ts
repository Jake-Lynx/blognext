import { articleSchemaWithIdValues } from "./schema";

export type AuthorProps = {
    id: string;
    username: string;
    avatar: string | '';
    initials: string;
}

export type ArticleProps = {
    id: string;
    title: string;
    slug: string;
    content?: string;
    excerpt: string;
    createdAt: Date;
    category: string;
    cover: string;
    author: AuthorProps;
}

export type UserArticleProps = {
    id: string;
    title: string;
    slug: string;
    createdAt: Date;
    category: string;
    cover: string;
}

export type CoverUploadProps = {
    info?: {
        url?: string
    } | string
}

export type ArticleTableProps = {
    id: string;
    slug?: string;
    title: string;
    category: string;
    createdAt: Date;
    excerpt: string;
}

export interface ArticleFormProps {
    mode?: 'create' | 'edit';
    initialData?: articleSchemaWithIdValues
}
