import Developers from "@/components/sections/Developers";
import { Metadata } from "next";
export async function generateMetadata({
    params,
}: {
    params: { slug: string };
}): Promise<Metadata> {
    return {
        title: "Game Developers | Games Corner",
        description: "",
        openGraph: {
            images: ["https://res.cloudinary.com/dxvpvtcbg/image/upload/v1719724381/ybqouw9jd8j8lr19uryo.jpg"],
            title: "GAME DEVELOPERS: MEET THE MINDS BEHIND YOUR FAVORITE GAMES",
            description: "Discover the creative forces driving the gaming industry. From indie innovators to major studios, learn about the developers who bring your favorite games to life and explore their latest projects and contributions to the gaming world.",
        },
        twitter: {
            card: "summary_large_image",
            creator: '@mahmovdsayed',
            title: "GAME DEVELOPERS: MEET THE MINDS BEHIND YOUR FAVORITE GAMES",
            description: "Discover the creative forces driving the gaming industry. From indie innovators to major studios, learn about the developers who bring your favorite games to life and explore their latest projects and contributions to the gaming world.",
            images: ["https://res.cloudinary.com/dxvpvtcbg/image/upload/v1719724381/ybqouw9jd8j8lr19uryo.jpg"],
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
interface IProps {

}

const page = ({ }: IProps) => {
    return <>
        <Developers />
    </>;
};

export default page;