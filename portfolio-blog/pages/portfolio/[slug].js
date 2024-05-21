import Head from "next/head";
import Image from "next/image";
import { MDXRemote } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';
import he from "he";

import { getPortfolioSlugs, getPortfolioItem } from "../../lib/data";

export const getStaticPaths = async () =>
{
    const slugsResponse = await getPortfolioSlugs();
    const slugs = slugsResponse.portfolios;

    return {
        paths: slugs.map((slug) => ({ params: { slug: slug.slug } })),
        fallback: false,
    };
};

export const getStaticProps = async ({ params }) =>
{
    const portfolioItem = await getPortfolioItem(params.slug);
    const content = await serialize(he.decode(portfolioItem.portfolios[ 0 ].content));
    return {
        props: {
            portfolioItem: portfolioItem.portfolios[ 0 ],
            content,
        },
    };
};

export default function Portfolio ({ portfolioItem, content })
{
    console.log(portfolioItem);

    return (
        <div>
            <Head>
                <title>{portfolioItem.title} | Portfolio & Blog App</title>
                <meta name="description" content="An awesome Portfolio & Blog App made with love by: 'YoTi' & 'Ali'" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <div>
                <h1>{portfolioItem.title}</h1>
                <p>{new Date(portfolioItem.date).toDateString()}</p>
                <p>{portfolioItem.description}</p>
                <Image
                    src={portfolioItem.coverImage.url}
                    width={portfolioItem.coverImage.width}
                    height={portfolioItem.coverImage.height} />
                <div>
                    {portfolioItem.tags && portfolioItem.tags.map((tag) => (
                        <span key={tag}>{tag}</span>
                    ))}
                </div>
                <div>
                    <MDXRemote {...content} />
                </div>
            </div>
        </div>
    );
}
