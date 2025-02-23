// react & next
import Link from "next/link"

// components
import { navLinks } from "@/app/content/nav-links"

// Other lib
import { SiFacebook, SiX, SiInstagram, SiYoutube, SiLinkedin } from "react-icons/si";


export default function Footer() {
    return (
        <footer className="bg-gray-800 text-white py-12 flex flex-col flex-wrap text-center">
            <div className="container mx-auto">
                {navLinks.map((item, index) => (
                    <Link
                        key={index}
                        href={item.href}
                        className="text-gray-400 hover:text-white mx-5"
                    >
                        {item.label}
                    </Link>
                ))}
            </div>
            <div className="flex flex-row justify-center gap-3 mt-10">
                <Link
                    href='#'
                    className="border p-4 rounded-md hover:bg-teal-500"
                >
                    <SiFacebook size={13} color="#fff" />
                </Link>
                <Link
                    href='#'
                    className="border p-4 rounded-md hover:bg-teal-500"
                >
                    <SiX size={13} color="#fff" />
                </Link>
                <Link
                    href='#'
                    className="border p-4 rounded-md hover:bg-teal-500"
                >
                    <SiInstagram size={13} color="#fff" />
                </Link>
                <Link
                    href='#'
                    className="border p-4 rounded-md hover:bg-teal-500"
                >
                    <SiYoutube size={13} color="#fff" />
                </Link>
                <Link
                    href='#'
                    className="border p-4 rounded-md hover:bg-teal-500"
                >
                    <SiLinkedin size={13} color="#fff" />
                </Link>
            </div>
            <div className="mt-4 pt-8 border-t border-gray-800 text-center text-gray-400">
                <p>© 2025 BlogNext. Tous droits reservés.</p>
            </div>
        </footer>
    )
}
