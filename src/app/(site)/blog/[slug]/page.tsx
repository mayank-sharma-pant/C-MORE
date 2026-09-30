import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getPosts } from "@/lib/content";
import { formatDate } from "@/lib/utils";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = (await getPosts()).find((item) => item.slug === slug);
  return { title: post?.title || "Journal" };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = (await getPosts()).find((item) => item.slug === slug);
  if (!post) notFound();

  return (
    <article>
      <header className="relative isolate min-h-[60vh] bg-ink text-white">
        <Image src={post.image} alt="" fill className="object-cover opacity-55" sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent" />
        <div className="wrap relative flex min-h-[60vh] flex-col justify-end py-16 pt-28">
          <p className="text-[11px] uppercase tracking-[0.22em] text-white/70">{formatDate(post.date)}</p>
          <h1 className="mt-3 max-w-3xl text-3xl leading-tight md:text-4xl">{post.title}</h1>
        </div>
      </header>
      <div className="section">
        <div className="wrap max-w-3xl space-y-5 text-lg text-muted">
          {post.body.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        </div>
      </div>
    </article>
  );
}
