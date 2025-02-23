import { Skeleton } from "../ui/skeleton";


export function SkeletonUserCard() {
    return (
        <div className="max-w-xs text-center py-2 px-4 rounded-md bg-slate-200 transform transition-transform duration-300">
            <div className="relative mx-auto w-28 h-28 rounded-xl bg-blue-100 flex items-center justify-center shadow-md">
                <Skeleton className="w-24 h-24 rounded-md" />
            </div>
            <Skeleton className="mt-4 h-6 w-32" />
            <Skeleton className="mt-2 h-4 w-40" />
        </div>
    )
}