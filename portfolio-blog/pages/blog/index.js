import Link from "next/link";
import { useState } from "react";
import { request } from "graphql-request";
import useSWR from "swr";

const fetcher = ({ endpoint, query, variables }) => request(endpoint, query, variables);

export const getStaticProps = async () => {
    try {
        const data = await fetcher({
            endpoint: "https://api-eu-central-1-shared-euc1-02.hygraph.com/v2/clw4uvypz0qfu07w8qjut1hbw/master",
            query: `
                query getPosts {
                    posts(orderBy: date_DESC) {
                        title
                        slug
                        description
                        date
                        tags
                        author {
                            name
                        }
                    }
                }
            `,
            variables: {},
        });
        return {
            props: {
                posts: data.posts || [],
            },
        };
    } catch (error) {
        console.error("Error fetching static props:", error);
        return {
            props: {
                posts: [],
                error: "Failed to fetch posts.",
            },
        };
    }
};

export default function BlogPage({ posts, error: initialError }) {
    const [searchValue, setSearchValue] = useState("");
    const { data = { posts: [] }, error } = useSWR(
        {
            endpoint: "https://api-eu-central-1-shared-euc1-02.hygraph.com/v2/clw4uvypz0qfu07w8qjut1hbw/master",
            query: `
                query getPosts($searchValue: String) {
                    posts(orderBy: date_DESC, where: { title_contains: $searchValue }) {
                        title
                        slug
                        description
                        date
                        author {
                            name
                        }
                    }
                }
            `,
            variables: { searchValue },
        },
        fetcher,
        { initialData: { posts }, revalidateOnFocus: true }
    );

    if (initialError || error) {
        return (
            <div>
                <h2 className="flex justify-center mb-10 mt-10 font-semibold text-3xl text-green-800">There was an error with the data fetching.</h2>
            </div>
        );
    }

    return (
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-0">
            <h1 className="text-5xl text-green-600 font-serif mb-8 font-bold">Our Blog</h1>
            <div>
                <input
                    type="text"
                    value={searchValue}
                    placeholder="Search blog posts"
                    className="focus:outline-none mb-6 focus:ring-2 focus:ring-green-900 w-full rounded-lg border h-10 pl-4 text-lg text-green-800 border-green-200"
                    onChange={(event) => setSearchValue(event.target.value)}
                />
            </div>
            <div className="mt-5">
                {data.posts.length > 0 ? (
                    data.posts.map((post) => (
                        <div key={post.slug} className="grid grid-cols-1 md:grid-cols-4 py-6">
                            <div className="mb-2 md:mb-0 md:col-span-1">
                                <p className="text-gray-600 text-sm">{new Date(post.date).toDateString()}</p>
                            </div>
                            <div className="md:col-span-3">
                                <Link href={`/blog/${post.slug}`}>
                                    <span className="text-2xl font-semibold text-gray-900 hover:text-gray-700 transition-colors duration-300">
                                        {post.title}
                                    </span>
                                </Link>
                                <p className="text-gray-700 leading-relaxed">{post.description}</p>
                                <div className="text-sm text-gray-900 font-semibold mt-1">{post.author.name}</div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="flex justify-center mb-10 mt-10 font-semibold text-3xl text-green-800">No posts found.</div>
                )}
            </div>
        </div>
    );
}
