import Head from "next/head";
import { getBlogSlugs, getPost } from "../../lib/data";

export const getStaticPaths = async () =>
{
    const slugsResponse = await getBlogSlugs();
    const slugs = slugsResponse.posts;

    return {
        paths: slugs.map((slug) => ({ params: { slug: slug.slug } })),
        fallback: false,
    };
};

export const getStaticProps = async ({ params }) =>
{

    const post = await getPost(params.slug);
    return {
        props: {
            post: post.posts[ 0 ],
        },
    };
};

export default function Portfolio ({ post })
{
    console.log(post);

    return (
        <div>
            <Head>
                <title>{getPost.title} | Portfolio & Blog App</title>
                <meta name="descripion" content="An awesome Portfolio & Blog App made with love by: 'YoTi' & 'Ali'" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <div>
                <h1>{post.title}</h1>
            </div>
        </div>
    );
}
