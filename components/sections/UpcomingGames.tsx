'use client'
import { Button, Card, CardBody, CardFooter, CardHeader, Image } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import LoadingScreen from "../Layout/LoadingScreen";
import LoadingUpComing from "../Ui/LoadingUpComing";

interface IProps { }

const UpcomingGames = ({ }: IProps) => {
    const apiKey = process.env.API_KEY as string;
    const [New, setNew] = useState<any[]>([]);
    const [Loading, setLoading] = useState(true);
    const router = useRouter();

    const newGamesApi = async () => {
        setLoading(true);
        const api = await fetch(`https://api.rawg.io/api/games/lists/main?key=${apiKey}&ordering=-released&page_size=10&page=1`, { mode: "cors" });
        const apiData = await api.json();
        setNew(apiData.results);
        setLoading(false);
    };

    useEffect(() => {
        newGamesApi();
    }, []);

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
        {Loading == true ? <LoadingUpComing /> :
            <div>
                <motion.h3
                    className="mb-4 text-4xl font-bold lg:text-6xl uppercase cursor-pointer hover:underline-offset-6 hover:underline"
                    variants={textVariants}
                    initial="hidden"
                    animate="visible"
                    onClick={()=> router.push('/upcoming')}
                >
                    New and Upcoming Games
                </motion.h3>
                <motion.p
                    className="my-2 line-clamp-6 text-default-600 font-medium text-tiny md:text-medium text-wrap "
                    variants={text2Variants}
                    initial="hidden"
                    animate="visible"
                >
                    Discover the latest and greatest in gaming with our selection of new and upcoming titles. Whether you're a fan of action-packed adventures, immersive simulations, or nostalgic remakes, there's something here for everyone. Stay tuned for the release of highly anticipated games like "Prince of Persia: The Sands of Time Remake," "Death Stranding 2: On the Beach," "Star Citizen," "Grand Theft Auto VI," and "MOUSE." Keep an eye on this space for updates on release dates and exclusive content.
                </motion.p>

                <motion.div
                    id="scroll-container"
                    className="flex justify-start space-x-3 overflow-x-auto scrollbar-hide "
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {New.map((game: any) => (
                        <motion.div
                            key={game.slug}

                            variants={itemVariants}
                            initial="hidden"
                            animate="visible"

                            className="min-w-[300px] max-w-[300px] md:min-w-[400px] md:max-w-[400px] h-[400px] md:h-[500px]"
                        >
                            <Card shadow="none" onClick={() => router.push(`/${game.slug}`)} isFooterBlurred isPressable className="h-full p-0 m-0">
                                <CardHeader className="absolute z-10 top-1 flex-col !items-start">
                                    <p className="text-tiny text-start text-white/60 uppercase font-bold">{game.name}</p>
                                    <h4 className="text-white text-start font-medium text-sm md:text-large">{game.genres[0].name}</h4>
                                </CardHeader>
                                <CardBody className="p-0 overflow-hidden">
                                    <Image
                                        removeWrapper
                                        loading='lazy'
                                        alt={game.name}
                                        className="z-0 w-full h-full object-cover object-center"
                                        src={game.background_image}
                                    />
                                </CardBody>
                                <CardFooter className="absolute bg-white/30 bottom-0 border-t-1 border-zinc-100/50 z-10 justify-between">
                                    <div>
                                        <p className="text-white text-tiny font-bold text-start">Available soon.</p>
                                        <p className="text-white font-medium text-start text-tiny md:text-sm">{game.name}</p>
                                    </div>
                                </CardFooter>
                            </Card>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        }
    </>
};

export default UpcomingGames;
