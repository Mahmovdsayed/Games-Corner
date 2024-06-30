'use client'
import { FaCloudDownloadAlt } from "react-icons/fa";

import { Button, Card, CardBody, CardFooter, CardHeader, Chip, Divider, Image, Link } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { LiaStoreSolid } from "react-icons/lia";
interface IProps {
    id: any,
    name: string
}

const storeImage = (store_id: any) => {
    if (store_id == "3") {
        return "";
    } else if (store_id == "11") {
        return "";
    } else if (store_id == "1") {
        return "";
    } else if (store_id == "7") {
        return "";
    } else if (store_id == "2") {
        return "";
    } else if (store_id == "5") {
        return "";
    } else if (store_id == "8") {
        return "";
    } else if (store_id == "9") {
        return "";
    } else if (store_id == "6") {
        return "";
    } else if (store_id == "4") {
        return "";
    } else {
        return "";
    }
}
const storeName = (store_id: any) => {
    if (store_id == "3") {
        return "Playstation Store";
    } else if (store_id == "11") {
        return "Epic Games";
    } else if (store_id == "1") {
        return "Steam Store";
    } else if (store_id == "7") {
        return "Xbox";
    } else if (store_id == "2") {
        return "Microsoft Store";
    } else if (store_id == "5") {
        return "GoG Store";
    } else if (store_id == "8") {
        return "Google Play";
    } else if (store_id == "9") {
        return "Itch Store";
    } else if (store_id == "6") {
        return "Nintendo Store";
    } else if (store_id == "4") {
        return "App Store";
    } else {
        return "";
    }
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
const Stores = ({ id, name }: IProps) => {
    const [image, setImage] = useState<any>([])
    const [loading, setLoading] = useState(true);
    const apiKey = process.env.API_KEY
    const GameScreens = async () => {
        setLoading(true);
        const allGames = await fetch(`https://api.rawg.io/api/games/${id}/stores?key=${apiKey}`, { mode: "cors" })
        const Data = await allGames.json()
        setImage(Data.results)
        setLoading(false);
    }
    useEffect(() => {
        GameScreens()
    }, [])

    return <>
        <div className={(image && image.length === 0) ? 'hidden' : 'my-4 mx-4'}>
            <Chip startContent={<LiaStoreSolid />} color="primary" className="mb-4 px-2" variant="solid" radius="sm">Stores</Chip>
            <p className='mb-4 text-sm md:text-lg font-medium text-wrap '>Find <span className="font-bold text-[#0070f0]">{name}</span> at these stores:</p>
            <div className="grid gap-2 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {image.map((store: any) =>
                    <Card  shadow="none" key={store.id}>
                        <CardHeader className="m-0 p-0">
                            <Image
                                className="object-cover object-center"
                                src={storeImage(store.store_id)}
                            />
                        </CardHeader>
                        <CardBody>
                            <h3 className="font-semibold">{storeName(store.store_id)}</h3>
                            <p className="text-sm font-medium my-2 text-default-500 line-clamp-[6]">{storeDescription(store.store_id)}</p>
                        </CardBody>
                        <Divider />
                        <CardFooter className="space-x-2">
                            <Button startContent={<FaCloudDownloadAlt />} color="primary" target="_blank" as={Link} href={store.url} className="w-full" >Download</Button>
                            <Button color="default" as={Link} href={`/stores/${store.store_id}`} showAnchorIcon className="w-full" >About Store</Button>
                        </CardFooter>
                    </Card>
                )}

            </div>
        </div>
    </>;
};

export default Stores;


