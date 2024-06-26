import Head from "next/head";
import Link from "next/link";
import Image from "next/legacy/image";
import { getPostsAndPortfolio } from "@/lib/data";
import Hero from "@/components/Hero";

// Function to fetch static props for the home page
export const getStaticProps = async () => {
  const data = await getPostsAndPortfolio(); // Fetching posts and portfolios data
  return {
    props: {
      data,
    },
  };
};

// Home page component
export default function Home({ data }) {
  return (
    <div>
      <Head>
        <title>Portfolio & Blog App</title> {/* Set document title */}
        <meta
          name="description"
          content="An awesome Portfolio & Blog App made with love by: 'YoTi' & 'Ali'" // Set meta description
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" /> {/* Set viewport meta */}
        <link rel="icon" href="/favicon.ico" /> {/* Set favicon */}
      </Head>

      <Hero /> {/* Render Hero component */}

      {/* Render portfolios */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-0">
        {data?.portfolios?.map((item) => (
          <div key={item.slug}>
            {/* Link to portfolio item */}
            <Link href={`/portfolio/${item.slug}`}>
              <span>
                <div className="relative mb-10">
                  {/* Overlay with title, description, and tags */}
                  <div className="absolute w-full h-full z-10 opacity-80 bg-green-900"></div>
                  <div className="absolute w-full h-full z-20 flex flex-col justify-center items-center text-center px-4">
                    <h3 className="text-white font-semibold text-2xl">{item.title}</h3>
                    <p className="text-gray-50 text-lg mt-4 leading-relaxed hidden md:flex">
                      {item.description}
                    </p>
                    <div className="mt-4">
                      {item.tags && item.tags.map((tag) => (
                        <span
                          className="text-white uppercase text-sm tracking-wide m-2 bg-green-700 px-2 py-1 rounded-lg"
                          key={tag}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  {/* Cover image */}
                  <Image
                    src={item.coverImage.url}
                    height={item.coverImage.height}
                    objectFit="cover"
                    width={item.coverImage.width}
                    className="absolute"
                  />
                </div>
              </span>
            </Link>
          </div>
        ))}
      </div>

      {/* Render recent posts */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-0">
        <div className="mt-20">
          <div className="text-4xl text-gray-900 font-semibold mb-4">Recent Posts</div>
          {data?.posts?.map((post) => (
            <div key={post.slug} className="grid grid-cols-1 md:grid-cols-4 py-6">
              <div className="mb-2 md:mb-0 md:col-span-1">
                <p className="text-gray-600 text-sm">{new Date(post.date).toDateString()}</p>
              </div>
              <div className="md:col-span-3">
                {/* Link to individual post */}
                <Link href={`/blog/${post.slug}`}>
                  <span className="text-2xl font-semibold text-gray-900 hover:text-gray-700 transition-colors duration-300">
                    {post.title}
                  </span>
                </Link>
                <p className="text-gray-700 leading-relaxed">{post.description}</p>
                <div className="text-sm text-gray-900 font-semibold mt-1">{post.author.name}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
