import Genres from "@/components/sections/Genres";
import { Metadata } from "next";
export async function generateMetadata({
    params,
}: {
    params: { slug: string };
}): Promise<Metadata> {
    return {
        title: "Genres | Games Corner",
        description: "",
        openGraph: {
            images: ["https://res.cloudinary.com/dxvpvtcbg/image/upload/v1719724381/ybqouw9jd8j8lr19uryo.jpg"],
            title: "EXPLORE THE BEST IN GAMING: A DIVE INTO ALL GENRES",
            description: "Immerse yourself in the diverse world of gaming genres. From action-packed adventures and immersive simulations to captivating RPGs, intense first-person shooters, and innovative indie games, there's something for every gamer. Stay tuned for updates on the latest and greatest titles, ensuring you never miss a beat in the ever-evolving gaming landscape.",
        },
        twitter: {
            card: "summary_large_image",
            creator: '@mahmovdsayed',
            title: "EXPLORE THE BEST IN GAMING: A DIVE INTO ALL GENRES",
            description: "Immerse yourself in the diverse world of gaming genres. From action-packed adventures and immersive simulations to captivating RPGs, intense first-person shooters, and innovative indie games, there's something for every gamer. Stay tuned for updates on the latest and greatest titles, ensuring you never miss a beat in the ever-evolving gaming landscape.",
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
    <Genres />
  </>;
};

export default page;