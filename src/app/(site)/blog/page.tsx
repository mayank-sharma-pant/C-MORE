import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { getPosts } from "@/lib/content";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = { title: "Journal" };

export default async function BlogPage() {
  const posts = await getPosts();
  return (
    <>
      <PageHero
        eyebrow="Journal"
        title="Notes on the routes."
        lede="Short explanations of how the published programmes are actually paced."
        image="https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=1800&q=80"
      />
      <section className="section">
        <div className="wrap grid gap-8">
          {posts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="grid overflow-hidden rounded-[1.6rem] bg-white md:grid-cols-[0.7fr_1.3fr]">
              <div className="relative min-h-64">
                <Image src={post.image} alt="" fill className="object-cover" sizes="40vw" />
              </div>
              <div className="p-8">
                <p className="text-[11px] uppercase tracking-[0.2em] text-saffron">{formatDate(post.date)}</p>
                <h2 className="mt-3 text-2xl">{post.title}</h2>
                <p className="mt-4 text-muted">{post.excerpt}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
