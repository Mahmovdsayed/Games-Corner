import Platforms from "@/components/sections/Platforms";
import { Metadata } from "next";
export async function generateMetadata({
    params,
}: {
    params: { slug: string };
}): Promise<Metadata> {
    return {
        title: "Platforms | Games Corner",
        description: "",
        openGraph: {
            images: ["https://res.cloudinary.com/dxvpvtcbg/image/upload/v1719724381/ybqouw9jd8j8lr19uryo.jpg"],
            title: "GAMING FOR EVERYONE: EXPLORE DIVERSE PLATFORMS",
            description: "Delve into the expansive world of gaming across multiple platforms. Whether you're on PC, PS5, Xbox One, Android, iOS, Nintendo Switch, or macOS, discover a diverse range of titles catering to every platform's unique capabilities. Stay updated on upcoming releases and exclusive content across all your favorite gaming mediums.",
        },
        twitter: {
            card: "summary_large_image",
            creator: '@mahmovdsayed',
            title: "GAMING FOR EVERYONE: EXPLORE DIVERSE PLATFORMS",
            description: "Delve into the expansive world of gaming across multiple platforms. Whether you're on PC, PS5, Xbox One, Android, iOS, Nintendo Switch, or macOS, discover a diverse range of titles catering to every platform's unique capabilities. Stay updated on upcoming releases and exclusive content across all your favorite gaming mediums.",
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
    <Platforms />
  </>;
};

export default page;