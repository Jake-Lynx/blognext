import { blogSchemaWithIdValues } from "./schema";

export type BlogProps = {
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

export interface BlogFormProps {
    mode?: 'create' | 'edit';
    initialData?: blogSchemaWithIdValues
}
