'use client'

import { useParams } from "next/navigation";
import { Chip, Skeleton } from "@nextui-org/react";
import { useEffect, useState } from "react";
import React from "react";
import { useRouter } from "next/navigation";

import { FaImages } from "react-icons/fa6";
import LoadingScreen from "../Layout/LoadingScreen";
import { motion } from "framer-motion";
interface IProps {

}
const DeveloperInfo = ({ }: IProps) => {
    const router = useRouter()

    const { slug } = useParams()
    const [image, setImage] = useState<any>([])
    const [loading, setLoading] = useState(true);
    const apiKey = process.env.API_KEY

    const GameScreens = async () => {
        setLoading(true);
        const allGames = await fetch(`https://api.rawg.io/api/developers/${slug}?key=${apiKey}`, { mode: "cors" })
        const Data = await allGames.json()
        setImage(Data)
        console.log(Data)
        setLoading(false);
    }
    function removeTgs(text: any) {
        var tempElement = document.createElement('div');
        tempElement.innerHTML = text;

        // Extract text content from the temporary element
        var textContent = tempElement.textContent || tempElement.innerText || "";
        return textContent;
    }
    const textVariants = {
        hidden: { opacity: 0, x: -200 },
        visible: { opacity: 1, x: 0, transition: { duration: 1 } }
    };
    const text2Variants = {
        hidden: { opacity: 0, x: 200 },
        visible: { opacity: 1, x: 0, transition: { duration: 1 } }
    };

    useEffect(() => {
        GameScreens()
    }, [])
    return <>
        {loading == true ?
            <div>
                <Skeleton className="w-fit rounded-md my-2">
                    <h3 >Hello world</h3>
                </Skeleton>
                <Skeleton className="w-fit rounded-md ">
                    <p className='my-2 line-clamp-6 text-gray-400 text-tiny md:text-medium text-wrap '>The action game is a genre that includes fights, puzzles, and strategies emphasizing coordination and reaction. It includes a large variety of sub-genres like fighting, beat 'em ups, shooters, survivals, mazes, and platforms; sometimes even multiplayer online battles and real-time strategies. Usually, the player performs as the protagonist with its unique abilities; some games add power-ups along the way. The character aims to complete levels, collect items, avoid obstacles, and battle against antagonists. It's necessary to avoid severe injuries during fights; if the health bar goes low, the player loses. Some games have an unbeatable number of enemies, and the only goal is to maximize score and survive for as long as possible. There might be a boss enemy who appears at the last level; he has unique abilities and a longer health bar. Pong is one of the first action games, released in 1972; the latest include Battlefield, Assasin's Creed, Fortnite and Dark Souls.</p>

                </Skeleton>
            </div>
            :
            <div>
                <motion.h1 variants={textVariants}
                    initial="hidden"
                    animate="visible" className="font-bold text-4xl md:text-6xl uppercase">{image.name}</motion.h1>
                <motion.p variants={text2Variants}
                    initial="hidden"
                    animate="visible" className='my-2 line-clamp-6 text-default-600 font-medium text-tiny md:text-medium text-wrap '>{removeTgs(image.description)}</motion.p>
            </div>
        }

    </>;
};

export default DeveloperInfo;