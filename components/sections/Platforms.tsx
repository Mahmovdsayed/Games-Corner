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
const Platforms = ({ }: IProps) => {
    const [loading, setLoading] = useState(true);
    const [genres, setgenres] = useState<any[]>([])
    const [currentPage, setCurrentPage] = useState(1);
    const router = useRouter()
    const apiKey = process.env.API_KEY
    const genresData = async () => {
        setLoading(true)
        const Genres = await fetch(`https://api.rawg.io/api/platforms?key=${apiKey}&page=${currentPage}`, { mode: "cors" })
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
                    animate="visible" className="font-bold text-4xl md:text-6xl uppercase">Gaming for Everyone: Explore Diverse Platforms
                </motion.h1>
                <motion.p variants={text2Variants}
                    initial="hidden"
                    animate="visible" className='my-2 line-clamp-6 text-default-600 font-medium text-tiny md:text-medium text-wrap '>Delve into the expansive world of gaming across multiple platforms. Whether you're on PC, PS5, Xbox One, Android, iOS, Nintendo Switch, or macOS, discover a diverse range of titles catering to every platform's unique capabilities. Stay updated on upcoming releases and exclusive content across all your favorite gaming mediums.
                </motion.p>
            </div>
            {loading == true ? <LoadingScreen /> :
                <div>
                    <motion.div variants={itemVariants}
                        initial="hidden"
                        animate="visible" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 mt-5">

                        {genres.map((gen: any) =>

                            <Card className={gen.games_count <= 200 ? "hidden" : ""} key={gen.id}>
                                <CardHeader className="p-0 m-0 w-full">
                                    <Image isZoomed src={gen.image_background} className="z-0 h-[200px] md:h-[300px]  w-[1000px] lg:w-[700px] object-cover" />
                                </CardHeader>
                                <CardBody>
                                    <div className="flex items-center justify-between my-2">
                                        <h3 onClick={() => router.push(`/platforms/${gen.id}`)} className="uppercase mb-2 text-2xl text-wrap font-semibold tracking-tight hover:underline hover:cursor-pointer">{gen.name}</h3>
                                        <Button as={Link} showAnchorIcon href={`/platforms/${gen.id}`} size="sm" color="primary" className="mb-2" radius="sm">View More</Button>
                                    </div>
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
                    <div className="overflow-hidden py-6 flex  justify-center align-middle">
                        <Pagination
                            showControls
                            total={2}
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
            }

        </div>
    </>;
};

export default Platforms;