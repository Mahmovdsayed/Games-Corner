'use client'

import { Button, Card, CardBody, CardFooter, CardHeader, Chip, Divider, Image, Link } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { FaVideo } from "react-icons/fa6";

import { LiaStoreSolid } from "react-icons/lia";
interface IProps {
    id: any,
    name: string
}
const Trailers = ({ id, name }: IProps) => {
    const [image, setImage] = useState<any>([])
    const [loading, setLoading] = useState(true);
    const apiKey = process.env.API_KEY
    const GameScreens = async () => {
        setLoading(true);
        const allGames = await fetch(`https://api.rawg.io/api/games/${id}/movies?key=${apiKey}`, { mode: "cors" })
        const Data = await allGames.json()
        setImage(Data.results)
        setLoading(false);
    }
    useEffect(() => {
        GameScreens()
    }, [])
    return <>
        <div className={(image && image.length === 0) ? 'hidden' : 'my-4 mx-4'}>
            <Chip startContent={<FaVideo />} color="primary" className="mb-4 px-2" variant="solid" radius="sm">Trailers</Chip>
            <p className='mb-4 text-sm md:text-lg font-medium text-wrap '>Watch the latest trailers for <span className="font-bold text-[#0070f0]">{name}</span> :</p>
            <div className="grid gap-2 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {image.map((store: any) =>
                    <Card shadow="none" key={store.id}>
                        <CardHeader >
                            <Image
                                className="object-cover object-center"
                                src={store.preview}
                                alt={store.id}
                            />
                        </CardHeader>
                        <CardBody>
                            <h3 className="font-semibold">{store.name}</h3>

                        </CardBody>
                        <Divider />
                        <CardFooter className="space-x-2">
                            <Button color="primary" target="_blank" as={Link} href={store.data.max} showAnchorIcon className="w-full" >Watch Trailer</Button>
                        </CardFooter>
                    </Card>
                )}

            </div>
        </div>
    </>;
};

export default Trailers;
