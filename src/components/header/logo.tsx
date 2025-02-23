// react & next
import Image from "next/image"
import Link from "next/link"

export function Logo() {
    return (
        <Link href="/" className="flex items-center">
            <span className="text-xl md:text-2xl font-bold text-teal-500">
                <Image
                    src='/logo.jpeg'
                    alt="logo de l'application"
                    width={80}
                    height={80}
                />
            </span>
        </Link>
    )
}
