import AuthMiddleware from "@/authMiddleware";
import Login from "@/components/auth/Login";
import { Metadata } from "next";
export async function generateMetadata({
    params,
}: {
    params: { slug: string };
}): Promise<Metadata> {
    return {
        title: "Login | Games Corner",
        description: "",
        openGraph: {
            images: ["https://res.cloudinary.com/dxvpvtcbg/image/upload/v1719724381/ybqouw9jd8j8lr19uryo.jpg"],
            title: "Login | Games Corner",
            description: "We are glad to see you back with us",
        },
        twitter: {
            card: "summary_large_image",
            creator: '@mahmovdsayed',
            title: "Login | Games Corner",
            description: "We are glad to see you back with us",
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
            <Login />
        </AuthMiddleware>
    </>;
};

export default page;