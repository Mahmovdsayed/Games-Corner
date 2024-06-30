import GameInfo from "@/components/sections/GameInfo";
import { Metadata } from "next";

interface IProps {

}
const apiKey = process.env.API_KEY

export async function generateMetadata({
    params,
}: {
    params: { slug: string };
}): Promise<Metadata> {
    const id = params.slug;
    const options = {
        method: "GET",
    };
    const res = await fetch(
        `https://api.rawg.io/api/games/${id}?key=${apiKey}`,
        options
    );
    const data = await res.json();
    return {
        title: data.name,
        description: data.overview,
        keywords: [data.name],
        openGraph: {
            images: [data.background_image],
            title: data.name,
            description: data.description_raw,
        },
        twitter: {
            card: "summary_large_image",
            creator: '@mahmovdsayed',
            title: data.name,
            description: data.description_raw,
            images: [data.background_image],
        },
        robots: {
            index: false,
            follow: true,
            nocache: true,
            googleBot: {
                index: true,
                follow: false,
                noimageindex: true,
                'max-video-preview': -1,
                'max-image-preview': 'large',
                'max-snippet': -1,
            },
        },
    };
}
const page = ({ }: IProps) => {
    return <>
        <GameInfo />
    </>;
};

export default page;