'use client'

import { Button, Card, CardBody, CardFooter, CardHeader, Chip, Divider, Image, Link } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { FaVideo } from "react-icons/fa6";
import { GrAchievement } from "react-icons/gr";

import { LiaStoreSolid } from "react-icons/lia";
interface IProps {
    id: any,
    name: string
}
const Achievements = ({ id, name }: IProps) => {
    const [image, setImage] = useState<any>([])
    const [loading, setLoading] = useState(true);
    const apiKey = process.env.API_KEY
    const GameScreens = async () => {
        setLoading(true);
        const allGames = await fetch(`https://api.rawg.io/api/games/${id}/achievements?key=${apiKey}`, { mode: "cors" })
        const Data = await allGames.json()
        setImage(Data.results)
        setLoading(false);
    }
    useEffect(() => {
        GameScreens()
    }, [])
    return <>
        <div className={(image && image.length === 0) ? 'hidden' : 'my-4 mx-4'}>
            <Chip startContent={<GrAchievement />} color="primary" className="mb-4 px-2" variant="solid" radius="sm">Achievements</Chip>
            <p className='mb-4 text-sm md:text-lg font-medium text-wrap '>Explore the achievements available in the game :</p>
            <div className="grid gap-2 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {image.map((store: any) =>
                    <Card key={store.id}>
                        <CardHeader >
                            <Image
                                className="object-cover object-center"
                                src={store.image}
                                alt={store.id}
                            />
                        </CardHeader>
                        <CardBody>
                            <h3 className="font-semibold">{store.name}</h3>
                            <p className="text-tiny my-2 text-gray-400">{store.description}</p>
                        </CardBody>

                    </Card>
                )}

            </div>
        </div>
    </>;
};

export default Achievements;
