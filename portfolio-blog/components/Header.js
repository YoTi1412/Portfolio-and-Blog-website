import Link from "next/link";

export default function Header ()
{
    return (
        <div className="w-full py-10 px-4 sm:px-6 lg:px-0">
            <div className="flex flex-col sm:flex-row justify-between max-w-3xl mx-auto items-center">
                <div className="text-3xl sm:text-2xl font-semibold">Portfolio & Blog App</div>
                <ul className="flex mt-4 sm:mt-0">
                    <li>
                        <Link href="/" passHref>
                            <span className="text-gray-900 hover:text-gray-700">Home</span>
                        </Link>
                    </li>
                    <li className="ml-4">
                        <Link href="/about" passHref>
                            <span className="text-gray-900 hover:text-gray-700">About</span>
                        </Link>
                    </li>
                    <li className="ml-4">
                        <Link href="/portfolio" passHref>
                            <span className="text-gray-900 hover:text-gray-700">Portfolio</span>
                        </Link>
                    </li>
                    <li className="ml-4">
                        <Link href="/blog" passHref>
                            <span className="text-gray-900 hover:text-gray-700">Blog</span>
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    );
}
