// react
import { Suspense } from "react";

// Components
import BlogsLatest from "@/components/blogs/blogs-latest";
import Link from "next/link";


export default function Home() {
  return (
    <div className="@container">
      <h1>Articles récents</h1>
      <Link href='/dashboard'>Admin</Link>

      <Suspense fallback={<p>Chargement...</p>}>
        <BlogsLatest />
      </Suspense>
    </div>  
  );
}
