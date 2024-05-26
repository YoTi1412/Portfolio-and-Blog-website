import Head from "next/head";
import Image from "next/image";
import { getBlogSlugs, getPost } from "../../lib/data";
import { MDXRemote } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';
import he from "he";


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
    const content = await serialize(he.decode(post.posts[ 0 ].content));
    return {
        props: {
            post: post.posts[ 0 ],
            content,
        },
    };
};

export default function Portfolio ({ post, content })
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

            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-0">
                <h1 className="text-6xl text-gray-900 font-bold selection:text-green-700">{post.title}</h1>
                <div className="flex space-x-3 mt-2">
                    {post.tags && post.tags.map((tag) => (
                        <span className="uppercase text-sm tracking-wide m-2 bg-green-200 px-2 py-1 rounded-lg text-green-700" key={tag}>{tag}</span>
                    ))}
                </div>
                <div className="flex justify-between items-center mb-8">
                    <p className="text-gray-700 selection:text-green-700">{new Date(post.date).toDateString()}</p>
                    <div className="flex items-center">
                        <p className="mr-4 text-gray-800 text-lg font-semibold selection:text-green-700">{post.author.name}</p>
                        <Image
                            className="rounded-full"
                            src={post.author.image.url}
                            width={75}
                            objectFit="cover"
                            height={75}
                            alt={post.author.name}
                        />
                    </div>
                </div>
                <div className="prose prose-xl max-w-none selection:bg-green-300 selection:text-green-900">
                    <MDXRemote {...content} />
                </div>
            </div>
        </div>
    );
}
