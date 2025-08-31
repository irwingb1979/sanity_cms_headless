// app/allposts/page.tsx
import { client } from "@/sanity/client";
import { type SanityDocument } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";
import Link from "next/link";

const POSTS_QUERY = `*[
  _type == "post"
  && defined(slug.current)
]|order(publishedAt desc){_id, title, slug, publishedAt, image, category}`;

export default async function AllPostsPage() {
  const posts = await client.fetch<SanityDocument[]>(POSTS_QUERY);
  const builder = imageUrlBuilder(client);

  return (
    <main className="mx-auto max-w-[1170px] px-4 sm:px-8 xl:px-0 mt-8">
      <h1 className="text-5xl font-bold mb-8 text-center">All Posts</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {posts.map((post) => (
          <div key={post._id} className="card card-side bg-base-100 shadow-sm">
            <figure>
              <img
                className="h-64 w-64 object-cover"
                src={builder.image(post.image).url()}
                alt={post.title}
              />
            </figure>
            <div className="card-body">
              <div className="badge badge-outline badge-secondary">{post.category}</div>
              <a href={`/${post.slug.current}`}>
                <h2 className="card-title mb-3">{post.title}</h2>
              </a>
              <div className="card-actions justify-end">
                <div className="badge text-gray-500">
                  Published: {new Date(post.publishedAt).toLocaleDateString()}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Back to Home Button */}
      <div className="flex justify-center mt-12">
        <Link href="/" className="btn btn-outline btn-primary rounded-lg">
          ⬅ Back to Home
        </Link>
      </div>
    </main>
  );
}
