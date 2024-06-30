'use client'
import { Card, CardHeader, CardBody, CardFooter, Tooltip, Image, Button, Breadcrumbs, BreadcrumbItem, ScrollShadow, Link, Chip, Progress, Avatar } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { useParams, usePathname } from 'next/navigation';
import { CgGames } from "react-icons/cg";
import { IoHome } from "react-icons/io5";
import { CiHeart } from "react-icons/ci";
import { FaOpencart } from "react-icons/fa6";
import React from "react";
import { FcAbout } from "react-icons/fc";
import { MdStarRate } from "react-icons/md";
import { BsInfoSquareFill } from "react-icons/bs";
import { FaReddit } from "react-icons/fa";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure, Divider, User } from "@nextui-org/react";
import {
  FaApple,
  FaLinux,
  FaPlaystation,
  FaXbox,
  FaAppStoreIos,
} from "react-icons/fa";
import { BsNintendoSwitch } from "react-icons/bs";
import { ImAndroid, ImSphere } from "react-icons/im";
import { FaComputer } from "react-icons/fa6";
import Screenshot from "../Games/screenshot";
import LoadingScreen from "../Layout/LoadingScreen";
import Stores from "../Games/Stores";
import Trailers from "../Games/Trailers";
import Subreddit from "../Games/Subreddit";
import GameSeries from "../Games/GameSeries";
import Achievements from "../Games/Achievements";
import FavButton from "../FavButton/FavButton";
interface IProps {

}
const rateColor = (color: any) => {
  if (color == "exceptional") {
    return "primary";
  } else if (color == "recommended") {
    return "default";
  } else if (color == "meh") {
    return "warning";
  } else if (color == "skip") {
    return "danger";
  }
}
const rateText = (content: any) => {
  if (content == "exceptional") {
    return "Great";
  } else if (content == "recommended") {
    return "Suggested";
  } else if (content == "meh") {
    return "Okay";
  } else if (content == "skip") {
    return "Not good";
  }
}
const GamePlatform = (platform: any) => {
  if (platform == "pc") {
    return <FaComputer />;
  } else if (platform == "mac") {
    return <FaApple />;
  } else if (platform == "linux") {
    return <FaLinux />;
  } else if (platform == "playstation") {
    return <FaPlaystation />;
  } else if (platform == "xbox") {
    return <FaXbox />;
  } else if (platform == "nintendo") {
    return <BsNintendoSwitch />;
  } else if (platform == "android") {
    return <ImAndroid />;
  } else if (platform == "ios") {
    return <FaAppStoreIos />;
  } else if (platform == "web") {
    return <ImSphere />;
  } else {
    return "";
  }
};
const GameInfo = ({ }: IProps) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { slug } = useParams()
  const [loading, setLoading] = useState(true);
  const [Games, setGames] = useState<any>([])
  const [Rate, setRate] = useState<any>([])
  const [Developers, setDevelopers] = useState<any>([])
  const [Platforms, setPlatforms] = useState<any>([])
  const [genres, setgenres] = useState<any>([])
  const [Tags, setTags] = useState<any>([])
  const [rec, setREC] = useState<any>([])

  const apiKey = process.env.API_KEY
  const GameInfo = async () => {
    setLoading(true);
    const allGames = await fetch(`https://api.rawg.io/api/games/${slug}?key=${apiKey}`, { mode: "cors" })
    const Data = await allGames.json()
    console.log(Data)
    setGames(Data)
    setREC(Data.platforms[0])
    setRate(Data.ratings)
    setDevelopers(Data.developers)
    setPlatforms(Data.parent_platforms)
    setgenres(Data.genres)
    setTags(Data.tags)
    setLoading(false);

  }

  useEffect(() => {
    GameInfo()
  }, [])
  return <>
    {loading == true ? <LoadingScreen /> :
      <div className="">
        <div className="my-4 ps-2 flex items-center justify-center ">
          <Breadcrumbs variant="light" radius="sm" size="sm" separator="/"

            itemClasses={{
              item: "text-black/60 data-[current=true]:text-black",
              separator: "text-black/40 px-2",
            }}>

            <BreadcrumbItem href="/" startContent={<IoHome />}>Home</BreadcrumbItem>
            <BreadcrumbItem startContent={<CgGames />}>{Games.name}</BreadcrumbItem>
          </Breadcrumbs>
        </div>
        <div className="p-0 m-0">
          <Image
            className={`${Games.background_image == null
              ? "md:h-[600px]"
              : "w-screen sm:h-[400px] lg:h-[600px] object-contain object-center rounded-t-3xl"
              } `}
            isBlurred
            radius="none"
            draggable="false"
            src={`${Games.background_image == null
              ? "https://res.cloudinary.com/dtpsyi5am/image/upload/v1705569779/lvg03c0u5h4rn4dam6u3.svg"
              : `${Games.background_image}`
              }`}
            alt={Games.name}
          />
        </div>
        <div className="flex flex-col items-center mt-6 px-4">
          <h1 className="font-bold text-3xl text-center text-wrap md:text-4xl uppercase">{Games.name}</h1>

          <Card shadow="none" className="my-4 flex flex-col items-center justify-center lg:w-1/2">
            <CardHeader className="text-start">
              <h2 className="flex items-center text-sm space-x-1"><span className="me-1"><FcAbout /></span> About <span className="font-bold">{Games.name}</span></h2>
            </CardHeader>
            <Divider />
            <CardBody>
              <p className="text-wrap text-tiny md:text-sm line-clamp-[10] font-medium text-start ">{Games.description_raw}</p>
            </CardBody>
          </Card>

          <div className="flex flex-col space-y-2 md:space-y-0 w-full md:flex-row  justify-center mb-4 md:space-x-2 pt-2">
            <FavButton slug={Games.slug} imgUrl={Games.background_image} title={Games.name} className='' />
            <Button className={(Games.metacritic_platforms && Games.metacritic_platforms.length === 0) ? 'hidden' : ''} onPress={onOpen} startContent={<FaOpencart />} radius="sm">Buy now</Button>
            <Modal backdrop="blur" placement="center" size="md" isOpen={isOpen} onOpenChange={onOpenChange}>
              <ModalContent>
                {(onClose) => (
                  <>
                    <ModalHeader className="flex gap-3 justify-start items-center">
                      <div className="flex flex-col">
                        <p className="text-md">Games Corner</p>
                        <p className="text-tiny text-default-500">powered by NEST</p>
                      </div></ModalHeader>
                    <Divider />

                    <ModalBody>
                      <div className="flex flex-col gap-1 my-4 w-full">
                        {Games.metacritic_platforms.map((buy: any) =>
                          <div key={buy.id} className="w-full p-2 bg-gradient-to-r from-rose-100 to-teal-100 rounded-md flex items-center justify-between">
                            <div> <div className="text-black text-sm flex flex-col ">
                              <span className="font-semibold">{buy.platform.name}</span>
                              <span className="text-tiny">{`buy game for ${buy.platform.name}`}</span>
                            </div>



                            </div>
                            <div>
                              <Button showAnchorIcon target="_blank" as={Link} href={buy.url} color="primary" size="sm">Buy now</Button>
                            </div>
                          </div>
                        )}


                      </div>

                    </ModalBody>

                  </>
                )}
              </ModalContent>
            </Modal>
            <Button target="_blank" radius="sm" className={Games.website == null ? `hidden` : ""} startContent={<ImSphere />} showAnchorIcon href={Games.website} as={Link}>Game Website</Button>
          </div>
        </div>
        <Divider />
        <div className="my-4 mx-4">
          <Chip startContent={<BsInfoSquareFill />} variant="solid" className="px-2" radius="sm" color="primary">Basic Information</Chip>
          <p className='my-4 text-sm md:text-lg font-medium text-wrap '>Get to know the essential details about <span className="font-bold text-[#0070f0]">{Games.name}</span> including its release date, platforms, and developer information.</p>
          <div>
            <Card shadow="none" className=" max-w-full">
              <CardBody className={Games.released == null ? "hidden" : ""}>
                <h3 className="mb-2 font-semibold">Released on</h3>
                <p>{Games.released}</p>
              </CardBody>
              <Divider />
              <CardBody className={(Developers && Developers.length === 0) ? 'hidden' : ''}>
                <h3 className="mb-2 font-semibold">Game Developers</h3>
                <div className="flex flex-col ">
                  {Developers.map((dev: any) =>
                    <div key={dev.id} className="flex gap-3 space-y-3 justify-start items-center">

                      <div className="flex flex-col">
                        <p className="text-md">{dev.name}</p>
                        <p className="text-tiny text-default-500"> <Link

                          showAnchorIcon
                          href={`/developers/${dev.slug}`}
                        >
                          view more about {dev.name}
                        </Link></p>
                      </div>
                    </div>
                  )}
                </div>

              </CardBody>
              <Divider />
              <CardBody className={(Platforms && Platforms.length === 0) ? 'hidden' : ''}>
                <h3 className="mb-2 font-semibold">Game Platforms</h3>
                <div className="flex flex-row  space-x-2  scrollbar-hide">
                  {Platforms.map((platform: any) =>
                    <div key={platform.platform.id}>

                      <Button size="sm" color="primary" startContent={GamePlatform(platform.platform.slug)}>{platform.platform.name}</Button>

                    </div>

                  )}
                </div>
              </CardBody>
              <Divider />
              <CardBody className={(genres && genres.length === 0) ? 'hidden' : ''}>
                <h3 className="mb-2 font-semibold">Game Genres</h3>
                <div className="flex flex-row  space-x-2  scrollbar-hide">
                  {genres.map((genres: any) =>
                    <div key={genres.id}>

                      <Chip
                        variant="solid"
                        color="primary"

                        avatar={
                          <Avatar
                            name={genres.name}
                            src={genres.image_background}
                          />
                        }
                      >
                        <span className="font-semibold">{genres.name}</span>
                      </Chip>

                    </div>

                  )}
                </div>
              </CardBody>
              <Divider />
              <CardBody className={(Tags && Tags.length === 0) ? 'hidden' : ''}>
                <h3 className="mb-2 font-semibold">Tags</h3>
                <div >
                  {Tags.map((tag: any) =>
                    <Chip
                      key={tag.id}
                      variant="solid"
                      className="me-1"
                      size="sm"
                      avatar={
                        <Avatar
                          name={tag.name}
                          src={tag.image_background}
                        />
                      }
                    >
                      <span className="font-semibold">{tag.name}</span>
                    </Chip>

                  )}
                </div>
              </CardBody>
              <Divider />
              <CardBody className={(rec.requirements.minimum == null) ? 'hidden' : ''}>
                <h3 className="mb-2 font-semibold">Requirements</h3>
                <div className="flex flex-col space-y-2">
                  <div className="text-tiny md:text-sm font-medium">{rec.requirements.minimum}</div>
                </div>
              </CardBody>
              <CardFooter className={Games.reddit_url == null ? `hidden` : "bg-[#0070f0]"}>
                <Link
                  isExternal
                  showAnchorIcon
                  className="text-white"
                  href={Games.reddit_url}
                  target="_blank"
                >
                  <span className="me-2"><FaReddit /></span>  Visit reddit page.
                </Link>
              </CardFooter>
            </Card>
          </div>
        </div>
        <Divider />
        <div className={(Rate && Rate.length === 0) ? 'hidden' : 'my-4 mx-4'}>
          <Chip startContent={<MdStarRate />} variant="solid" radius="sm" color="primary">Ratings and Reviews</Chip>
          <p className='my-4 text-sm md:text-lg font-medium text-wrap '>Find out what critics and players are saying about <span className="font-bold text-[#0070f0]">{Games.name}</span> with comprehensive ratings and reviews from trusted sources.</p>
          <div className="flex flex-col lg:flex-row lg:justify-center lg:items-center lg:my-0 lg:space-x-2 lg:space-y-0 items-start justify-start space-y-2 my-4">
            {Rate.map((rate: any) =>
              <Progress
                key={rate.id}
                label={rateText(rate.title) + " - " + rate.percent + "%"}
                aria-label={rate.title}
                color={rateColor(rate.title)}
                size="lg"
                value={rate.percent}
                className="max-w-md"
                radius="sm"
              />
            )}

          </div>
        </div>
        <Divider />
        <Stores id={slug} name={Games.name} />
        <Divider />
        <Screenshot name={Games.name} />
        <Divider />
        <Achievements id={slug} name={Games.name} />
        <Divider />
        <Trailers id={slug} name={Games.name} />
        <Divider />
        <Subreddit id={slug} name={Games.name} />
        <Divider />
        <GameSeries id={slug} name={Games.name} />
      </div>
    }
  </>;
};

export default GameInfo;