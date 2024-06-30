'use client'
import { Button, Card, CardBody, CardFooter, CardHeader, Divider, Image, Link } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FaUsers } from "react-icons/fa";
import { formatNumber } from "@/functions/formatNumber";
import Banner from "./Banner";
import LoadingScreen from "../Layout/LoadingScreen";
import { motion } from "framer-motion";
interface IProps {

}
const Genres = ({ }: IProps) => {
    const [loading, setLoading] = useState(true);
    const [genres, setgenres] = useState<any[]>([])
    const router = useRouter()
    const apiKey = process.env.API_KEY
    const genresData = async () => {
        setLoading(true)
        const Genres = await fetch(`https://api.rawg.io/api/genres?key=${apiKey}`, { mode: "cors" })
        const Data = await Genres.json()
        setgenres(Data.results)
        setLoading(false)
    }
    useEffect(() => {
        genresData()
    }, [])
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

    const textVariants = {
        hidden: { opacity: 0, x: -200 },
        visible: { opacity: 1, x: 0, transition: { duration: 1 } }
    };
    const text2Variants = {
        hidden: { opacity: 0, x: 200 },
        visible: { opacity: 1, x: 0, transition: { duration: 1 } }
    };
    return <>
        <div className="px-4 pb-4">
            <Banner />
            <div>
                <motion.h1
                    className="mb-4 text-4xl font-bold lg:text-6xl uppercase"
                    variants={textVariants}
                    initial="hidden"
                    animate="visible"
                >
                    Explore the Best in Gaming: A Dive into All Genres
                </motion.h1>
                <motion.p
                    className="my-2 line-clamp-6 text-default-600 font-medium text-tiny md:text-medium text-wrap "
                    variants={text2Variants}
                    initial="hidden"
                    animate="visible"
                >
                    Immerse yourself in the diverse world of gaming genres. From action-packed adventures and immersive simulations to captivating RPGs, intense first-person shooters, and innovative indie games, there's something for every gamer. Stay tuned for updates on the latest and greatest titles, ensuring you never miss a beat in the ever-evolving gaming landscape.
                </motion.p>
            </div>
            {loading == true ? <LoadingScreen /> :
                <div>
                    <motion.div
                        id="scroll-container"
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 mt-5"
                        variants={itemVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        {genres.map((gen: any) =>
                            <Card className="" key={gen.id}>
                                <CardHeader className="p-0 m-0 w-full">
                                    <Image isZoomed src={gen.image_background} className="z-0 h-[200px] md:h-[300px]  w-[1000px] lg:w-[700px] object-cover" />
                                </CardHeader>
                                <CardBody>
                                    <div className="flex items-center justify-between my-2 px-2">
                                        <h3 onClick={() => router.push(`/genres/${gen.slug}`)} className="uppercase mb-2 text-2xl text-wrap font-semibold tracking-tight hover:underline hover:cursor-pointer">{gen.name}</h3>
                                        <Button as={Link} showAnchorIcon href={`/genres/${gen.slug}`} size="sm" color="primary" className="mb-2" radius="sm">View More</Button>
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
                </div>
            }


        </div>
    </>;
};

export default Genres;