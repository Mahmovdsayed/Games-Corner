import Stores from "@/components/sections/Stores";
import { Metadata } from "next";
export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  return {
    title: "Stores | Games Corner",
    description: "",
    openGraph: {
      images: ["https://res.cloudinary.com/dxvpvtcbg/image/upload/v1719724381/ybqouw9jd8j8lr19uryo.jpg"],
      title: "GAMING MARKETPLACES: EXPLORE TOP STORES LIKE XBOX, PLAYSTATION, STEAM, AND MORE",
      description: "Discover the leading gaming marketplaces where you can find a wide range of titles and exclusive content. From Xbox and PlayStation to Steam, Epic Games, and beyond, explore these platforms to access the latest games and updates for your gaming pleasure.",
    },
    twitter: {
      card: "summary_large_image",
      creator: '@mahmovdsayed',
      title: "GAMING MARKETPLACES: EXPLORE TOP STORES LIKE XBOX, PLAYSTATION, STEAM, AND MORE",
      description: "Discover the leading gaming marketplaces where you can find a wide range of titles and exclusive content. From Xbox and PlayStation to Steam, Epic Games, and beyond, explore these platforms to access the latest games and updates for your gaming pleasure.",
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
    <Stores />
  </>;
};

export default page;