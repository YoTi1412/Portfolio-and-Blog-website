import Head from "next/head";
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
    return {
        props: {
            portfolioItem: portfolioItem.portfolios[ 0 ],
        },
    };
};

export default function Portfolio ({ portfolioItem })
{
    console.log(portfolioItem);

    return (
        <div>
            <Head>
                <title>{portfolioItem.title} | Portfolio & Blog App</title>
                <meta name="descripion" content="An awesome Portfolio & Blog App made with love by: 'YoTi' & 'Ali'" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <div>
                <h1>{portfolioItem.title}</h1>
            </div>
        </div>
    );
}
