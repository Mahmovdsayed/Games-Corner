import AllNewGames from "@/components/upcomingGames/AllNewGames";
import { Metadata } from "next";
export async function generateMetadata({
    params,
}: {
    params: { slug: string };
}): Promise<Metadata> {
    return {
        title: "Upcoming | Games Corner",
        description: "",
        openGraph: {
            images: ["https://res.cloudinary.com/dxvpvtcbg/image/upload/v1719724381/ybqouw9jd8j8lr19uryo.jpg"],
            title: "ALL NEW AND UPCOMING GAMES",
            description: "Discover the latest and greatest in gaming with our selection of new and upcoming titles. Whether you're a fan of action-packed adventures, immersive simulations, or nostalgic remakes, there's something here for everyone. Stay tuned for the release of highly anticipated games like Prince of Persia: The Sands of Time Remake, Death Stranding 2: On the Beach, Star Citizen, Grand Theft Auto VI, and MOUSE. Keep an eye on this space for updates on release dates and exclusive content.",
        },
        twitter: {
            card: "summary_large_image",
            creator: '@mahmovdsayed',
            title: "ALL NEW AND UPCOMING GAMES",
            description: "Discover the latest and greatest in gaming with our selection of new and upcoming titles. Whether you're a fan of action-packed adventures, immersive simulations, or nostalgic remakes, there's something here for everyone. Stay tuned for the release of highly anticipated games like Prince of Persia: The Sands of Time Remake, Death Stranding 2: On the Beach, Star Citizen, Grand Theft Auto VI, and MOUSE. Keep an eye on this space for updates on release dates and exclusive content.",
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
        <AllNewGames />
    </>;
};

export default page;