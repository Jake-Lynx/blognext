// react & next
import type { Metadata } from "next";

// css
import "./globals.css";

// components
import {Header} from "@/components/header/header";
import Footer from "@/components/footer/footer";
import { ThemeProvider } from "@/components/ui/theme-provider";

// others lib
import { Toaster } from "react-hot-toast";
import { ClerkProvider } from '@clerk/nextjs'
import { Inter } from "next/font/google";
import clsx from "clsx";

const inter = Inter({
  subsets: ['latin']
})

export const metadata: Metadata = {
  title: "BlogNext",
  description: "Blogger 3x plus vite grâce à l'IA",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={clsx("dark:bg-gray-900", inter.className)}>
          <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
          >
            <Toaster position="top-center" />
            <Header />
            <main className="min-h-screen dark:bg-gray-900">{children}</main>
            <Footer />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
