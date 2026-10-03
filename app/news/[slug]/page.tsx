import { MDXRemote } from "next-mdx-remote/rsc";
import Link from "next/link";
import { notFound } from "next/navigation";
import remarkGfm from "remark-gfm";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { formatDate, getAllPosts, getPost } from "@/lib/news";
import { buildMetadata } from "@/lib/seo";
import { absoluteUrl, site } from "@/lib/site";

type Params = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

// `output: "export"` requires at least one route. Before the first post exists, a placeholder is generated
// and then deleted from out/ by scripts/postbuild.mjs.
const PLACEHOLDER_SLUG = "_placeholder";

export function generateStaticParams() {
  const posts = getAllPosts();
  return posts.length ? posts.map((post) => ({ slug: post.slug })) : [{ slug: PLACEHOLDER_SLUG }];
}

export async function generateMetadata({ params }: Params) {
  const post = getPost((await params).slug);
  if (!post) return {};
  return buildMetadata({
    title: post.title,
    description: post.description,
    path: `/news/${post.slug}`,
    type: "article",
    publishedTime: post.date,
    modifiedTime: post.updated ?? post.date,
    image: post.image ? { url: post.image, width: 1200, height: 630, alt: post.imageAlt ?? post.title } : undefined,
  });
}

export default async function NewsPostPage({ params }: Params) {
  const post = getPost((await params).slug);
  if (!post) notFound();
  const url = absoluteUrl(`/news/${post.slug}`);
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "NewsArticle",
          headline: post.title,
          description: post.description,
          datePublished: post.date,
          dateModified: post.updated ?? post.date,
          mainEntityOfPage: url,
          url,
          image: [absoluteUrl(post.image ?? site.ogImage.url)],
          author: { "@type": "Organization", name: post.author },
          publisher: { "@id": `${site.url}/#organization` },
          keywords: post.tags.join(", ") || undefined,
        }}
      />
      <PageHero
        trail={[
          { name: "News", path: "/news" },
          { name: post.title, path: `/news/${post.slug}` },
        ]}
        title={post.title}
      >
        <p>{post.description}</p>
        <div className="article-meta">
          <time dateTime={post.date}>{formatDate(post.date)}</time>
          {post.updated && <span>Updated {formatDate(post.updated)}</span>}
          <span>{post.author}</span>
        </div>
      </PageHero>
      <section className="section">
        <div className="container">
          <article className="prose">
            {post.image && <img className="article-cover" src={post.image} alt={post.imageAlt ?? ""} />}
            <MDXRemote source={post.body} options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }} />
          </article>
          <p style={{ marginTop: 48 }}>
            <Link className="text-link" href="/news">
              ← All news
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}
