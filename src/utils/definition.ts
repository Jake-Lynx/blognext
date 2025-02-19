import { articleSchemaWithIdValues } from "./schema";

export type ArticleProps = {
    id: string;
    title: string;
    slug?: string;
    content?: string;
    resume?: string;
    createdAt: Date;
    category: string;
    cover: string;
}

export type CoverUploadProps = {
    info?: {
        url?: string
    } | string
}

export interface ArticleFormProps {
    mode?: 'create' | 'edit';
    initialData?: articleSchemaWithIdValues
}
