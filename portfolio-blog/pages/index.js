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

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-0">
        <div className="mt-10">
          {data?.posts.map((post) => (
            <div className="grid grid-cols-1 md:grid-cols-4 py-6" key={post.slug}>
              <div className="mb-2 md:mb-6 md:col-span-1">
                <p className="text-gray-600 text-sm">{new Date(post.date).toDateString()}</p>
              </div>
              <div className="md:col-span-3">
                <Link href={`/blog/${post.slug}`}>
                  <span className="text-2xl font-semibold text-gray-900 hover:text-gray-700 transition-colors duration-300">
                    {post.title}
                  </span>
                </Link>
                <p className="text-gray-700 leading-relaxed">
                  {post.description}
                </p>
                <div className="text-sm text-gray-900 font-semibold mt-1">
                  {post.author.name}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
