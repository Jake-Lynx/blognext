// actions
import { getAllAuthors } from '@/actions/user'

// components
import UserCard from '@/components/users/user-card'


export default async function AuthorsList() {
    const authors = await getAllAuthors()
    
    return (
        <div
            className='flex flex-row flex-wrap justify-center gap-10'
        >
            {authors?.map((author) => (
                <UserCard
                    key={author.id}
                    author={author}
                />
            ))}
        </div>
    )
}
