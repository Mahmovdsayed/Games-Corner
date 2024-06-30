'use client'
import { Button, Card, CardBody, CardFooter, CardHeader, Divider, Image, Link, Pagination } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FaUsers } from "react-icons/fa";
import { formatNumber } from "@/functions/formatNumber";
import Banner from "./Banner";
import { GoMoveToTop } from "react-icons/go";
import { motion } from "framer-motion";
import LoadingScreen from "../Layout/LoadingScreen";

interface IProps {

}
const storeDescription = (store_id: any) => {
    if (store_id == "3") {
        return "The PlayStation Store is an online digital marketplace where users can purchase and download video games, DLC (downloadable content), movies, and other multimedia content for PlayStation gaming consoles, including the PlayStation 4 and PlayStation 5. It offers a wide range of titles from various genres and publishers, along with exclusive deals, discounts, and pre-order options for upcoming releases. Additionally, the PlayStation Store provides a convenient platform for users to manage their digital library and access content directly from their gaming console.";
    } else if (store_id == "11") {
        return "The Epic Games Store is a digital distribution platform for video games, developed and operated by Epic Games. It offers a curated selection of PC and Mac games, including both popular titles and indie gems. One of the distinguishing features of the Epic Games Store is its revenue share model, where developers receive a larger percentage of the sales revenue compared to other platforms, incentivizing more developers to publish their games on the store. Additionally, the Epic Games Store frequently offers free games to users, often rotating the selection on a weekly basis, making it an attractive destination for gamers looking to expand their library at no cost.";
    } else if (store_id == "1") {
        return "The Steam Store is a leading digital distribution platform for PC, Mac, and Linux games, offering a vast library of titles across genres. With its robust community features, regular sales events, and user-friendly interface, Steam is a go-to destination for millions of gamers worldwide.";
    } else if (store_id == "7") {
        return "The Xbox Store is Microsoft's digital marketplace for Xbox consoles, offering a wide selection of games, DLC, movies, and apps. It provides convenient access to digital content and exclusive deals for Xbox users.";
    } else if (store_id == "2") {
        return "The Microsoft Store is Microsoft's digital marketplace for apps, games, movies, and more, available across Windows PCs, Xbox consoles, and mobile devices.";
    } else if (store_id == "5") {
        return "GOG, formerly Good Old Games, is a DRM-free digital distribution platform specializing in PC, Mac, and Linux games, offering a diverse library of classic and modern titles.";
    } else if (store_id == "8") {
        return "Google Play is Google's digital marketplace for Android devices, offering a vast selection of apps, games, movies, music, books, and more.";
    } else if (store_id == "9") {
        return "itch.io is an indie-centric digital distribution platform offering a diverse range of games, music, comics, and software, with a focus on community and inclusivity.";
    } else if (store_id == "6") {
        return "The Nintendo eShop is Nintendo's digital store for their gaming consoles, offering a wide range of digital games, DLC, demos, and apps for download directly to devices like the Nintendo Switch and 3DS.";
    } else if (store_id == "4") {
        return "The App Store is Apple's digital marketplace for iOS and iPadOS devices, offering a vast selection of mobile apps for various purposes, including games, productivity tools, and entertainment apps.";
    } else {
        return "";
    }
}
const storeImage = (store_id: any) => {
    if (store_id == "3") {
        return "https://res.cloudinary.com/dtpsyi5am/image/upload/v1710351389/rhqqvgzngw7seafyrjbs.svg";
    } else if (store_id == "11") {
        return "https://res.cloudinary.com/dtpsyi5am/image/upload/v1710351390/nm3ejk0jpn3fjsfkpa9w.svg";
    } else if (store_id == "1") {
        return "https://res.cloudinary.com/dtpsyi5am/image/upload/v1710351389/z7lpkgqwkdehxsfj8knz.svg";
    } else if (store_id == "7") {
        return "https://res.cloudinary.com/dtpsyi5am/image/upload/v1710351390/oxbf0ouvglhfnmr2fdl5.svg";
    } else if (store_id == "2") {
        return "https://res.cloudinary.com/dtpsyi5am/image/upload/v1710351390/ftuqmwrgrthqmqyq9mu3.svg";
    } else if (store_id == "5") {
        return "https://res.cloudinary.com/dtpsyi5am/image/upload/v1710352247/brifelywqqtghhjawhbc.svg";
    } else if (store_id == "8") {
        return "https://res.cloudinary.com/dtpsyi5am/image/upload/v1710352247/ajsx0coobiudu2xhjoxg.svg";
    } else if (store_id == "9") {
        return "https://res.cloudinary.com/dtpsyi5am/image/upload/v1710352247/tkk9vysg4l2eabbbfoii.svg";
    } else if (store_id == "6") {
        return "https://res.cloudinary.com/dtpsyi5am/image/upload/v1710352247/cwf5kckkhx2rkoruh3k7.svg";
    } else if (store_id == "4") {
        return "https://res.cloudinary.com/dtpsyi5am/image/upload/v1710352585/oy7fbyocksnply5wyfih.svg";
    } else {
        return "";
    }
}
const Stores = ({ }: IProps) => {
    const [loading, setLoading] = useState(true);
    const [genres, setgenres] = useState<any[]>([])
    const [currentPage, setCurrentPage] = useState(1);
    const router = useRouter()
    const apiKey = process.env.API_KEY
    const genresData = async () => {
        setLoading(true)
        const Genres = await fetch(`https://api.rawg.io/api/stores?key=${apiKey}&page=${currentPage}`, { mode: "cors" })
        const Data = await Genres.json()
        setgenres(Data.results)
        setLoading(false)
    }
    useEffect(() => {
        genresData()
    }, [currentPage])
    function scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };
    const textVariants = {
        hidden: { opacity: 0, x: -200 },
        visible: { opacity: 1, x: 0, transition: { duration: 1 } }
    };
    const text2Variants = {
        hidden: { opacity: 0, x: 200 },
        visible: { opacity: 1, x: 0, transition: { duration: 1 } }
    };
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 3
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 150 },
        visible: { opacity: 1, y: 0, transition: { duration: 1 } }
    };

    return <>
        <div className="px-4 pb-4">
            <Banner />
            <div>
                <motion.h1 variants={textVariants}
                    initial="hidden"
                    animate="visible" className="font-bold text-4xl md:text-6xl uppercase">Gaming Marketplaces: Explore Top Stores like Xbox, PlayStation, Steam, and More
                </motion.h1>
                <motion.p variants={text2Variants}
                    initial="hidden"
                    animate="visible" className='my-2 line-clamp-6 text-default-600 font-medium text-tiny md:text-medium text-wrap '>
                    Discover the leading gaming marketplaces where you can find a wide range of titles and exclusive content. From Xbox and PlayStation to Steam, Epic Games, and beyond, explore these platforms to access the latest games and updates for your gaming pleasure.
                </motion.p>
            </div>            {loading == true ? <LoadingScreen /> :
                <div>
                    <motion.div variants={itemVariants}
                        initial="hidden"
                        animate="visible" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 mt-5">

                        {genres.map((gen: any) =>

                            <Card className={gen.games_count <= 200 ? "hidden" : ""} key={gen.id}>
                                <CardHeader className="p-0 m-0 w-full">
                                    <Image isZoomed src={gen.image_background} className="z-0  object-cover" />
                                </CardHeader>
                                <CardBody>
                                    <div className="flex items-center justify-between my-2">
                                        <div>
                                            <h3 onClick={() => router.push(`/stores/${gen.id}`)} className="uppercase mb-2 text-2xl text-wrap font-semibold tracking-tight hover:underline hover:cursor-pointer">{gen.name}</h3>
                                            <p className="text-tiny my-2 font-medium text-default-600 line-clamp-[3]">{storeDescription(gen.id)}</p>
                                        </div>

                                    </div>
                                    <Button as={Link} showAnchorIcon href={`/stores/${gen.id}`} size="sm" color="primary" className="mb-2" radius="sm">View More</Button>
                                    <CardFooter className="flex items-center justify-between">
                                        <div className="text-sm font-bold capitalize">popular items</div>
                                        <div className="text-sm font-bold">{formatNumber(gen.games_count)}</div>
                                    </CardFooter>
                                    <Divider />
                                    {gen.games.map((game: any) =>
                                        <CardFooter key={game.id} className="flex items-center justify-between py-1">
                                            <div className="text-sm font-medium underline text-default-600 cursor-pointer" onClick={() => router.push(`/${game.slug}`)}>{game.name}</div>
                                            <div className="text-sm font-medium flex items-center justify-center text-default-600">{formatNumber(game.added)} <span className="ps-1"><FaUsers /></span></div>
                                        </CardFooter>
                                    )}

                                </CardBody>
                            </Card>
                        )}
                    </motion.div>
                </div>
            }

        </div>
    </>;
};

export default Stores;