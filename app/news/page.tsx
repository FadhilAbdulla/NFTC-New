import Link from "next/link";
import { Icon } from "@/components/Icon";
import { PageHero } from "@/components/PageHero";
import { formatDate, getAllPosts } from "@/lib/news";
import { buildMetadata, pageMetadata } from "@/lib/seo";
import { pages } from "@/lib/site";

const posts = getAllPosts();

// Until the first post is published the page exists but is kept out of search results and the sitemap.
export const metadata = posts.length ? pageMetadata("/news") : buildMetadata({ ...pages["/news"], path: "/news", noindex: true });

export default function NewsPage() {
  return (
    <>
      <PageHero trail={[{ name: "News", path: "/news" }]} title="News & updates from the Federation.">
        <p>Announcements, programme updates and stories from NFTCI and its member cooperatives.</p>
      </PageHero>
      <section className="section">
        <div className="container">
          {posts.length === 0 ? (
            <div className="empty-state">
              <h2 className="h3-size">No updates published yet</h2>
              <p style={{ margin: 0 }}>News from the Federation will appear here.</p>
            </div>
          ) : (
            <div className="news-list">
              {posts.map((post) => (
                <article className="card news-card hover-card reveal" key={post.slug}>
                  <time dateTime={post.date}>{formatDate(post.date)}</time>
                  <h2>
                    <Link href={`/news/${post.slug}`}>{post.title}</Link>
                  </h2>
                  <p>{post.description}</p>
                  <Link className="text-link" href={`/news/${post.slug}`} aria-label={`Read: ${post.title}`}>
                    Read update <Icon name="arrow" size={16} />
                  </Link>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
