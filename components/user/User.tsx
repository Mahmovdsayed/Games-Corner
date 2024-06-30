'use client'

import { Button, Chip, Divider, Image, Link } from "@nextui-org/react";
import { MdVerified, MdAccessTimeFilled } from "react-icons/md";
import { changeDateFormat } from "@/functions/changeDateFormat";
import { FaInstagram, FaLink } from "react-icons/fa";
import { handleClick } from "@/functions/copyUrl";

interface IProps {
    username: string,
    firstName: string,
    secondName: string,
    gender: string,
    verified: boolean,
    createdAt: any,
    image: string,
    instagram: string
}

const UserInfo = ({ username, firstName, secondName, gender, verified, createdAt, image, instagram }: IProps) => {

    return <>
        <div className="container mx-auto px-4 ">
            <div className="flex flex-col justify-center items-center text-center py-6">
                <Image radius="lg" className=" h-[150px] w-[150px]" src={image} />
                <h4 className="text-sm text-default-500 font-bold mt-3"><span className="font-bold">@</span>{username}</h4>
                <h1 className="capitalize font-semibold  text-2xl flex items-center">{firstName} {" "} {secondName} {verified ? <span className={"text-blue-600 text-md md:text-2xl ms-1 md:ms-2"}>
                    {" "}
                    <MdVerified />
                </span> : ""} </h1>
                <div className="flex   justify-center items-center space-x-2">
                    {/* <Chip startContent={<BsStarFill />} className="text-tiny my-1" radius="sm" variant="dot" color="danger"><span className="font-bold">Legend</span></Chip> */}

                    <Chip startContent={<MdAccessTimeFilled />} className="text-tiny " radius="sm" variant="dot" color="primary">Member since: <span className="font-bold">{changeDateFormat(createdAt)}</span></Chip>
                    {verified ? <Chip startContent={<MdVerified />} className="text-tiny my-2" radius="sm" variant="dot" color="warning">Verified by <span className="font-bold">NEST</span></Chip>
                        : ""}
                </div>
                <div className="w-full md:w-auto mx-auto flex space-x-2 my-2">
                    <Button color="default" className="w-full font-medium" variant="faded" radius="sm" onClick={handleClick}>Copy Profile Link</Button>
                    {instagram && (
                        <Button as={Link} target="_blank" href={`https://www.instagram.com/${instagram}`} color="primary" className="w-full font-medium" radius="sm" startContent={<FaInstagram size={20} />}>Instagram</Button>
                    )}
                </div>

            </div>
            <Divider />

        </div>
    </>;
};

export default UserInfo;