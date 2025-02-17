import Link from 'next/link'
import React from 'react'

export default function Dashboard() {
    return (
        <div>
            <h1>Bienvenue cher admin</h1>
            <Link href='/dashboard/blogs'>Voir les articles</Link>
        </div>
    )
}
