import Image from "next/legacy/image";
import Link from "next/link";
import { getPortfolioItems } from "@/lib/data";

// Function to fetch static props for the blog page
export const getStaticProps = async () => {
    const data = await getPortfolioItems(); // Fetching portfolio items data
    console.log(data); // Logging fetched data for debugging
    return {
        props: {
            items: data.portfolios, // Passing fetched portfolio items as props
        },
    };
};

export default function PortfolioPage({ items }) {
    console.log(items); // Logging received items for debugging
    return (
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-0">
            {/* Mapping through portfolio items and rendering each */}
            {items?.map((item) => (
                <div key={item.slug}>
                    {/* Link to the individual portfolio item */}
                    <Link href={`/portfolio/${item.slug}`}>
                        <span>
                            <div className="relative mb-10">
                                {/* Overlay with title, description, and tags */}
                                <div className="absolute w-full h-full z-10 opacity-80 bg-green-900"></div>
                                <div className="absolute w-full h-full z-20 flex flex-col justify-center items-center text-center px-4">
                                    <h3 className="text-white font-semibold text-2xl">{item.title}</h3>
                                    {/* Description */}
                                    <p className="text-gray-50 text-lg mt-4 leading-relaxed hidden md:flex">{item.description}</p>
                                    {/* Tags */}
                                    <div className="mt-4">
                                        {item.tags.map((tag) => (
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
    );
}
