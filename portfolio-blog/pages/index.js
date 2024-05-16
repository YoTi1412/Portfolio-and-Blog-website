import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { getPostsAndPortfolio } from "./lib/data";

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
  console.log(data);


  return (
    <div>
      <Head>
        <title>Portfolio & Blog App</title>
        <meta name="An awesome Portfolio & Blog App made with love by : 'YoTi' & 'Ali'" content="ALX final Project" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1>
        Welcome to our Portfolio & Blog App
      </h1>

      <div>
        {
          data?.portfolios.map((item) => (
            <div key={item.slug}>
              <Link href={`/portfolio/${item.slug}`}>
                {item.title}
              </Link>
            </div>
          ))
        }
      </div>

      <div className="mt-10">
        {
          data?.posts.map((post) => (
            <div key={post.slug}>
              <Link href={`/blog/${post.slug}`}>
                {post.title}
              </Link>
            </div>
          ))
        }
      </div>

    </div>
  );
}
