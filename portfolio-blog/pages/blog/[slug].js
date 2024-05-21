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

            <div>
                <h1>{post.title}</h1>
                <p>{new Date(post.date).toDateString()}</p>
                <p>{post.description}</p>
                <div>
                    <p>
                        {post.author.name}
                        {post.author.image && (
                            <Image
                                src={post.author.image.url}
                                width={post.author.image.width / 3}
                                height={post.author.image.height / 3}
                                alt={post.author.name}
                            />
                        )}
                    </p>
                </div>
                <div>
                    {post.tags && post.tags.map((tag) => (
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
