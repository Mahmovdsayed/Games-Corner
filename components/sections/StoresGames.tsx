'use client'
import { CiHeart } from "react-icons/ci";
import { useRouter } from "next/navigation";
import { FcLinux } from "react-icons/fc";
import { useParams, usePathname } from 'next/navigation';

import { Card, CardFooter, CardHeader, Chip, Tooltip, Image, Button, CardBody, Link, Divider } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { Pagination } from "@nextui-org/react";
import { GoMoveToTop } from "react-icons/go";
import { motion } from "framer-motion";
import { FaComputer } from "react-icons/fa6";
import {
    FaApple,
    FaLinux,
    FaPlaystation,
    FaXbox,
    FaAppStoreIos,
    FaGooglePlay,
} from "react-icons/fa";
import { BsNintendoSwitch } from "react-icons/bs";
import { ImAndroid, ImSphere } from "react-icons/im";
import LoadingScreen from "../Layout/LoadingScreen";
import { changeDateFormat } from "@/functions/changeDateFormat";
import Banner from "./Banner";
import Info from "../genres/Info";
import PlatformInfo from "../platforms/PlatformInfo";
import StoreInfo from "../stores/StoreInfo";
import FavButton from "../FavButton/FavButton";
interface IProps {

}
const StoresGames = ({ }: IProps) => {
    useEffect(() => {
        setTimeout(() => {
            setLoading(true);
        });
    }, []);
    const router = useRouter()
    const { slug } = useParams()
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [Games, setGames] = useState<any[]>([])
    const apiKey = process.env.API_KEY
    const GamePlatform = (platform: any) => {
        if (platform == "pc") {
            return <FaComputer />;
        } else if (platform == "mac") {
            return <FaApple />;
        } else if (platform == "linux") {
            return <FcLinux />;
        } else if (platform == "playstation") {
            return <FaPlaystation />;
        } else if (platform == "xbox") {
            return <FaXbox />;
        } else if (platform == "nintendo") {
            return <BsNintendoSwitch />;
        } else if (platform == "android") {
            return <FaGooglePlay />;
        } else if (platform == "ios") {
            return <FaAppStoreIos />;
        } else if (platform == "web") {
            return <ImSphere />;
        } else {
            return "";
        }
    };
    async function getGamesData() {
        setLoading(true);
        const allGames = await fetch(`https://api.rawg.io/api/games?key=${apiKey}&page=${currentPage}&stores=${slug}`, { mode: "cors" })
        const Data = await allGames.json()
        setGames(Data.results)
        setLoading(false);
    }

    useEffect(() => {
        getGamesData()
    }, [currentPage])

    function scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };
    const itemVariants = {
        hidden: { opacity: 0, y: 150 },
        visible: { opacity: 1, y: 0, transition: { duration: 1 } }
    };

    return <>
        {loading == true ? (
            <LoadingScreen />
        ) : (
            <div className="px-4 pb-4">
                <Banner />
                <StoreInfo />
                <motion.div variants={itemVariants}
                    initial="hidden"
                    animate="visible" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 mt-5">
                    {Games.map((game) =>
                        <Card shadow="lg" className=" " key={game.id}>
                            <div className="p-0 z-0 relative">
                                <Image draggable={false} alt={game.name} className="z-0 h-[200px] md:h-[300px]  w-[1000px] lg:w-[700px] object-cover" src={game.background_image} />

                            </div>
                            <div className="flex justify-between items-center">
                                <CardBody className="flex flex-row  space-x-2  scrollbar-hide">
                                    {game.parent_platforms.map((platform: any) =>
                                        <div key={platform.platform.id}>
                                            <Tooltip radius="sm" color="primary" className="capitalize" content={platform.platform.slug}>
                                                <Button size="sm" color="primary" isIconOnly startContent={GamePlatform(platform.platform.slug)}></Button>
                                            </Tooltip>
                                        </div>

                                    )}


                                </CardBody>
                                <div className="me-2">
                                    <Chip variant="dot" color="primary" radius="sm" className={game.metacritic == null ? `hidden` : ""}><span className="font-bold text-tiny">{game.metacritic}</span></Chip>
                                </div>
                            </div>

                            <CardFooter className={`flex flex-col items-start  space-y-2 `}>

                                <div className="mb-2 text-2xl text-wrap font-bold tracking-tight hover:underline hover:cursor-pointer" onClick={() => router.push(`/${game.slug}`)}>{game.name}</div>
                                <Divider className="my-4 rounded-full  w-1/2" />
                                <div className=" text-tiny "><span className="text-tiny font-medium">published on</span> <span className="font-bold ">{changeDateFormat(game.released)}</span></div>
                                <div className="text-tiny flex space-x-2"><span className="text-tiny">Genres :</span> {game.genres.map((gen: any) =>
                                    <span key={gen.id} className="font-bold space-x-2 text-blue-500 underline cursor-pointer" onClick={() => router.push(`/genres/${gen.slug}`)}>{gen.name}</span>

                                )}</div>
                                <Divider />
                                <div className='my-2 flex justify-between items-center gap-4 overflow-x-scroll scrollbar-hide'>
                                    {game.short_screenshots.map((shot: any) =>
                                        <Image removeWrapper draggable={false} className={shot.id == -1 ? "hidden" : 'object-cover h-[100px] w-[300px] rounded-xl'} alt={game.name} src={shot.image} />
                                    )}
                                </div>
                                <div className="flex flex-col space-y-2 md:space-y-0 w-full md:flex-row md:space-x-2 pt-2">
                                    <FavButton slug={game.slug} imgUrl={game.background_image} title={game.name} className='w-full' />
                                    <Button as={Link} className="w-full" radius="sm" onClick={() => router.push(`/${game.slug}`)} showAnchorIcon>about Game</Button>
                                </div>
                            </CardFooter>
                        </Card>
                    )}
                </motion.div>
                <div className="overflow-hidden py-6 flex  justify-center align-middle">
                    <Pagination
                        showControls
                        total={50}
                        page={currentPage}
                        onChange={setCurrentPage}
                        color="primary"
                        initialPage={1}

                    />
                </div>
                <div className="flex items-center justify-center">
                    <Button startContent={<GoMoveToTop />} onClick={scrollToTop} >Scroll to Top</Button>
                </div>
            </div>

        )}

    </>;
};

export default StoresGames;