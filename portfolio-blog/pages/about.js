import Head from 'next/head';

export default function About ()
{
    return (
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-0">
            <Head>
                <title>About Us</title>
                <meta name="description" content="Learn about our last project for ALX." />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className="mt-10">
                <h1 className="text-5xl text-green-600 font-serif mb-8 font-bold">About Us</h1>
                <p>This is just our last project for ALX. I love you All</p>
            </main>
        </div>
    );
}
