import AuthMiddleware from "@/authMiddleware";
import Signup from "@/components/auth/Signup";
import { Metadata } from "next";
export async function generateMetadata({
    params,
}: {
    params: { slug: string };
}): Promise<Metadata> {
    return {
        title: "Signup | Games Corner",
        description: "",
        openGraph: {
            images: ["https://res.cloudinary.com/dxvpvtcbg/image/upload/v1719724381/ybqouw9jd8j8lr19uryo.jpg"],
            title: "Signup | Games Corner",
            description: "Create your account and dive into the ultimate gaming world",
        },
        twitter: {
            card: "summary_large_image",
            creator: '@mahmovdsayed',
            title: "Signup | Games Corner",
            description: "Create your account and dive into the ultimate gaming world",
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
        <AuthMiddleware>
            <Signup />
        </AuthMiddleware>
    </>;
};

export default page;