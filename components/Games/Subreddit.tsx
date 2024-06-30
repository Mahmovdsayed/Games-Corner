'use client'

import { Button, Card, CardBody, CardFooter, CardHeader, Chip, Divider, Image, Link, User } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { LiaStoreSolid } from "react-icons/lia";
interface IProps {
    id: any,
    name: string
}
import { FaReddit } from "react-icons/fa";
import { changeDateFormat } from "@/functions/changeDateFormat";


const Subreddit = ({ id, name }: IProps) => {
    const [image, setImage] = useState<any>([])
    const [loading, setLoading] = useState(true);
    const apiKey = process.env.API_KEY
    const GameScreens = async () => {
        setLoading(true);
        const allGames = await fetch(`https://api.rawg.io/api/games/${id}/reddit?key=${apiKey}`, { mode: "cors" })
        const Data = await allGames.json()
        setImage(Data.results)
        setLoading(false);
    }
    useEffect(() => {
        GameScreens()
    }, [])
    function removeTgs(text:string){
        var tempElement = document.createElement('div');
        tempElement.innerHTML = text;
        
        // Extract text content from the temporary element
        var textContent = tempElement.textContent || tempElement.innerText || "";
        return textContent;
    }
    return <>
        <div className={(image && image.length === 0) ? 'hidden' : 'my-4 mx-4'}>
            <Chip startContent={<FaReddit />} color="primary" className="mb-4 px-2 bg-[#FF5700]" variant="solid" radius="sm">Subreddit</Chip>
            <p className='mb-4 text-sm md:text-lg font-medium text-wrap'>Most Recent Posts from <span className="font-bold text-[#FF5700]">{name}</span> :</p>
            <div className="grid gap-2 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {image.map((store: any) =>
                    <Card shadow="none" className={store.text == "" ? "hidden" : ""} key={store.id}>
                        <CardBody>
                            <h3 className="font-semibold">{store.name}</h3>
                            <Divider className="mt-2" />
                            <p className="text-sm font-medium my-2 text-default-600 line-clamp-[12]">{removeTgs(store.text)}</p>
                        </CardBody>
                        <Divider />
                        <CardFooter className="space-x-2 flex items-center justify-between bg-[#FF5700]">
                            <span className="text-white text-tiny font-semibold">{changeDateFormat(store.created)}</span>
                            <Button radius="sm" size="sm" className="bg-white" target="_blank" href={store.url} as={Link} showAnchorIcon>View Post</Button>
                        </CardFooter>
                    </Card>
                )}

            </div>
        </div>
    </>;
};

export default Subreddit;


