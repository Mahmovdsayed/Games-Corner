import Tags from "@/components/sections/Tags";
import { Metadata } from "next";
export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  return {
    title: "Tags | Games Corner",
    description: "",
    openGraph: {
      images: ["https://res.cloudinary.com/dxvpvtcbg/image/upload/v1719724381/ybqouw9jd8j8lr19uryo.jpg"],
      title: "EXPLORING GAMING TAGS: A DIVE INTO DIVERSE EXPERIENCES",
      description: "Dive into the world of gaming tags and discover the best experiences tailored to your preferences. Whether you prefer the solitary challenges of singleplayer adventures or the dynamic interactions of multiplayer battles, explore a range of tags that define the gaming experience.",
    },
    twitter: {
      card: "summary_large_image",
      creator: '@mahmovdsayed',
      title: "EXPLORING GAMING TAGS: A DIVE INTO DIVERSE EXPERIENCES",
      description: "Dive into the world of gaming tags and discover the best experiences tailored to your preferences. Whether you prefer the solitary challenges of singleplayer adventures or the dynamic interactions of multiplayer battles, explore a range of tags that define the gaming experience.",
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
    <Tags />
  </>;
};

export default page;