import Link from "next/link";
import { type SanityDocument } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";
import Hero from "./components/Hero";
import { client } from "@/sanity/client";
import CategoryTabs from "./components/TabsCat";

const POSTS_QUERY = `*[
  _type == "post"
  && defined(slug.current)
]|order(publishedAt desc)[0...12]{_id, title, slug, publishedAt, image, category}`;
const options = { next: { revalidate: 30 } };

export default async function IndexPage() {
  const posts = await client.fetch<SanityDocument[]>(POSTS_QUERY, {}, options);
  const builder = imageUrlBuilder(client);
  const images = posts.map((post) => builder.image(post.image).url());

  return (
    <>
      <main className="mx-auto max-w-[1170px] px-4 sm:px-8 xl:px-0 relative z-1">
        <Hero />

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 mt-8">
          {posts.slice(0, 2).map((post) => (
            <div className="card card-side bg-base-100 shadow-sm" key={post._id}>
              <figure>
                <img
                  className="h-64 w-64 object-cover"
                  src={images[posts.indexOf(post)]}
                  alt={post.title} />
              </figure>
              <div className="card-body">
                <div className="badge badge-outline badge-secondary">{post.category}</div>
                <Link href={`${post.slug.current}`}>
                  <h2 className="card-title mb-3">{post.title}</h2>
                </Link>
                <div className="card-actions justify-end">
                  <div className="badge text-gray-500">Published: {new Date(post.publishedAt).toLocaleDateString()}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="divider mt-16 mb-16">
          <a href="./allposts" className="btn btn-outline btn-accent rounded-lg">
            View All Posts
          </a>
        </div>

        {/* Browse by Category Section */}
        <CategoryTabs
          posts={posts.map((post) => ({
            _id: post._id,
            title: post.title,
            slug: post.slug,
            publishedAt: post.publishedAt,
            image: post.image,
            category: post.category,
            body: post.body ?? "", // Ensure 'body' is present, fallback to empty string if missing
          }))}
        />
      </main>
    </>
  );
}