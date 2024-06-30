'use client'
import { FaCloudDownloadAlt } from "react-icons/fa";

import { Button, Card, CardBody, CardFooter, CardHeader, Tooltip, Chip, Divider, Image, Link } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { LiaStoreSolid } from "react-icons/lia";
import { useRouter } from "next/navigation";
import { FaComputer } from "react-icons/fa6";
import { FcLinux } from "react-icons/fc";
import { CgGames } from "react-icons/cg";

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
import { changeDateFormat } from "@/functions/changeDateFormat";
import { CiHeart } from "react-icons/ci";
import FavButton from "../FavButton/FavButton";
interface IProps {
  id: any,
  name: string
}
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
const GameSeries = ({ id, name }: IProps) => {
  const router = useRouter()
  const [image, setImage] = useState<any>([])
  const [loading, setLoading] = useState(true);
  const apiKey = process.env.API_KEY
  const GameScreens = async () => {
    setLoading(true);
    const allGames = await fetch(`https://api.rawg.io/api/games/${id}/game-series?key=${apiKey}`, { mode: "cors" })
    const Data = await allGames.json()
    setImage(Data.results)
    setLoading(false);
  }
  useEffect(() => {
    GameScreens()
  }, [])

  return <>
    <div className={(image && image.length === 0) ? 'hidden' : 'my-4 mx-4'}>
      <Chip startContent={<CgGames />} color="primary" className="mb-4 px-2" variant="solid" radius="sm">Game Series</Chip>
      <p className='mb-4 text-sm md:text-lg font-medium text-wrap '><span className="font-bold text-[#0070f0]">{name}</span> Series:</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 mt-5">
        {image.map((game: any) =>

          <Card shadow="lg" className="shadow-2xl " key={game.id}>
            <div className="p-0 z-0 relative">
              <Image draggable={false} alt={game.name} className="z-0 h-[200px] md:h-[300px] rounded-b-none  w-[1000px] lg:w-[700px] object-cover" src={game.background_image} />

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

              <div className="flex flex-col space-y-2 md:space-y-0 w-full md:flex-row md:space-x-2 pt-2">
                <FavButton slug={game.slug} imgUrl={game.background_image} title={game.name} className='' />
                <Button as={Link} radius="sm" onClick={() => router.push(`/${game.slug}`)} showAnchorIcon>about Game</Button>
              </div>
            </CardFooter>
          </Card>

        )}
      </div>
    </div>
  </>;
};
export default GameSeries;