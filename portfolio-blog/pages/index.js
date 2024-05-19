import Head from "next/head";
import Link from "next/link";
import { getPostsAndPortfolio } from "../lib/data";

export const getStaticProps = async () =>
{
  const data = await getPostsAndPortfolio();
  return {
    props: {
      data,
    },
  };
};

export default function Home ({ data })
{
  return (
    <div>
      <Head>
        <title>Portfolio & Blog App</title>
        <meta
          name="description"
          content="An awesome Portfolio & Blog App made with love by: 'YoTi' & 'Ali'"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div>
        {data?.portfolios.map((item) => (
          <div key={item.slug}>
            <Link href={`/portfolio/${item.slug}`}>
              {item.title}
            </Link>
          </div>
        ))}
      </div>

      <div className="mt-10">
        {data?.posts.map((post) => (
          <div key={post.slug}>
            <Link href={`/blog/${post.slug}`}>
              {post.title}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
