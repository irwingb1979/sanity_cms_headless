import { PortableText, type SanityDocument } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { client } from "@/sanity/client";
import Link from "next/link";

const POST_QUERY = `*[_type == "post" && slug.current == $slug][0]`;

const { projectId, dataset } = client.config();
const urlFor = (source: SanityImageSource) =>
  projectId && dataset
    ? imageUrlBuilder({ projectId, dataset }).image(source)
    : null;

const options = { next: { revalidate: 30 } };

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const post = await client.fetch<SanityDocument>(POST_QUERY, await params, options);
  const postImageUrl = post.image
    ? urlFor(post.image)?.width(550).height(310).url()
    : null;

  return (
    <main className="container mx-auto min-h-screen max-w-3xl p-8 flex flex-col gap-4">
      <Link href="/" className="hover:underline">
        ← Back to posts
      </Link>
      <div className="justify-center flex flex-col items-center text-center gap-4">
        <div className="badge badge-outline badge-secondary">{post.category}</div>
        <h1 className="text-4xl font-bold">{post.title}</h1>
        <div className="prose">
          <p>Published: {new Date(post.publishedAt).toLocaleDateString()}</p> 
        </div>
      </div>
      <div className="flex justify-center w-full">
        {postImageUrl && (
          <img
            src={postImageUrl}
            alt={post.title}
            className="aspect-video rounded-xl w-full object-cover"
          />
        )}
      </div>
      <div className="prose max-w-none p-6">
        {post.body && <PortableText value={post.body} />}
      </div>  
      

    </main>
  );
}