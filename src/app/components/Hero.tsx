import { PortableText, type SanityDocument } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";
import { client } from "@/sanity/client";

const HERO_QUERY = `*[_type == "hero"]
{ _id, headline, subheadline, heroImage, publishedAt, ctaText, ctaLink }[0]`;
const options = { next: { revalidate: 30 } };

export default async function Hero()  {
    const hero = await client.fetch<SanityDocument>(HERO_QUERY, {}, options);
    const builder = imageUrlBuilder(client);

    return (
        <div
            className="hero min-h-[400px] rounded-lg mt-8"
            style={{
                backgroundImage:
                    "url(" + builder.image(hero.heroImage).width(2000).url() + ")",
            }}
        >
            <div className="hero-overlay rounded-lg"></div>
            <div className="hero-content text-neutral-content text-center">
                <div className="max-w-md">
                    <h1 className="mb-5 text-5xl font-bold">{hero.headline}</h1>
                    <p className="mb-5">
                        {hero.subheadline}
                    </p>
                    <a href={hero.ctaLink} className="btn btn-outline btn-success rounded-lg">{hero.ctaText}</a>
                </div>
            </div>
        </div>

    );
}
