import Head from "next/head"
import Hero from '@/components/Hero'
import Newsletter from '@/components/Newsletter'

export default function Home() {
    return (
        <>
            <Head>
                <title>Bibek Meher | Tech Entrepreneur</title>
                <meta name="description" content="Bibek Meher is a Tech Entrepreneur and Open Source developer. Explore projects, AI tools, and portfolio of Bibek Meher." />
            </Head>

            <h1 style={{ display: "none" }}>Bibek Meher – Tech Entrepreneur & Ai/Open Source Developer</h1>

            <Hero />
            <Newsletter />
        </>
    )
}