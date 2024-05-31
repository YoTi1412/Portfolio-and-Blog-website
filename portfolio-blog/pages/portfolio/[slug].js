import Head from "next/head";
import Image from "next/image";
import { MDXRemote } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';
import he from "he";

import { getPortfolioSlugs, getPortfolioItem } from "../../lib/data";

// Function to generate static paths for portfolio items
export const getStaticPaths = async () => {
    // Fetching portfolio slugs
    const slugsResponse = await getPortfolioSlugs();
    const slugs = slugsResponse.portfolios;

    return {
        paths: slugs.map((slug) => ({ params: { slug: slug.slug } })),
        fallback: false,
    };
};

// Function to fetch static props for each portfolio item
export const getStaticProps = async ({ params }) => {
    // Fetching portfolio item data based on slug
    const portfolioItem = await getPortfolioItem(params.slug);
    const content = await serialize(he.decode(portfolioItem.portfolios[ 0 ].content));
    return {
        props: {
            portfolioItem: portfolioItem.portfolios[ 0 ],
            content,
        },
    };
};

export default function Portfolio ({ portfolioItem, content }) {
    console.log(portfolioItem);

    return (
        <div>
            <Head>
                <title>{portfolioItem.title} | Portfolio & Blog App</title>
                <meta name="description" content="An awesome Portfolio & Blog App made with love by: 'YoTi' & 'Ali'" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-0">
                {/* Portfolio item title */}
                <h1 className="text-6xl text-gray-900 font-bold selection:text-green-700">{portfolioItem.title}</h1>
                {/* Portfolio item date and tags */}
                <div className="flex justify-between items-center mt-4">
                    <p className="text-gray-700 selection:text-green-700">{new Date(portfolioItem.date).toDateString()}</p>
                    <div>
                        {/* Mapping through tags and displaying them */}
                        {portfolioItem.tags && portfolioItem.tags.map((tag) => (
                            <span className="uppercase text-sm tracking-wide m-2 bg-green-200 px-2 py-1 rounded-lg text-green-700" key={tag}>{tag}</span>
                        ))}
                    </div>
                </div>
                {/* Portfolio item description */}
                <p className="prose prose-xl py-4 selection:text-green-700">{portfolioItem.description}</p>
                {/* Portfolio item cover image */}
                <Image
                    src={portfolioItem.coverImage.url}
                    width={portfolioItem.coverImage.width}
                    height={portfolioItem.coverImage.height} />

                {/* Rendering MDX content */}
                <div className="prose prose-xl max-w-none mt-4 selection:bg-green-300 selection:text-green-900">
                    <MDXRemote {...content} />
                </div>
            </div>
        </div>
    );

