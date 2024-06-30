
import { revalidatePath } from "next/cache";
import { Metadata } from "next";
import UserInfo from "@/components/user/User";
import HomePage from "@/components/sections/Home";
import Fav from "@/components/user/Fav";

let loading
export async function generateMetadata({
    params,
}: {
    params: { slug: string };
}): Promise<Metadata> {
    const url = process.env.USER_BACKEND_URL || "";
    const secUrl = process.env.USERFAVS_BACKEND_URL || "";
    const id = params.slug;


    const options = {
        method: "GET",
    };
    const resp = await fetch(`${url}${params.slug}`, { cache: 'no-cache' });
    const userData = await resp.json()
    return {
        title: userData.data.username,
        keywords: [userData.data.username],
        openGraph: {
            images: [userData.data.image],
            title: userData.data.username,

        },
        twitter: {
            card: "summary_large_image",
            title: userData.data.username,
            images: [userData.data.image],
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

const page = async ({
    params,
}: {
    params: { slug: string };

}) => {

    loading = "yes"
    const url = process.env.USER_BACKEND_URL || "";
    const secUrl = process.env.USERFAVS_BACKEND_URL || "";
    revalidatePath(`/user/[slug]`, "page")
    const res = await fetch(`${url}${params.slug}`, { cache: 'no-cache' });
    const userData = await res.json()
    const post = await fetch(`${secUrl}${params.slug}`, { next: { revalidate: 1 }, cache: 'no-cache' })
    const postData = await post.json()
    loading = "no"
    return <>
        {loading == "yes" ? <div>Loading...</div> :
            <div>
                {/* <Banner BannerColor={userData.data.banner} username={userData.data.username} image={userData.data.image} /> */}
                <UserInfo instagram={userData.data.instagram} image={userData.data.image} username={userData.data.username} firstName={userData.data.firstName} secondName={userData.data.secondName} gender={userData.data.gender} verified={userData.data.verifed} createdAt={userData.data.createdAt} />
                <Fav posts={postData} />
            </div>
        }

    </>;
};

export default page;