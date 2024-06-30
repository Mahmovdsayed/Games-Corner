"use client";
interface IProps { }
import { Button, Image, Link } from "@nextui-org/react";
import { FaFacebookF, FaInstagram, FaTiktok } from "react-icons/fa";
import { FaXTwitter, FaLink } from "react-icons/fa6";
import { BsThreads } from "react-icons/bs";

const Footer = ({ }: IProps) => {
  return (
    <>
      <div className="p-6 shadow bg-[#fff] text-black">
        <div className="flex  flex-col md:flex-row justify-center md:justify-between items-center">
          <div className="space-x-2 mb-2 md:mb-0">
            <Button
              href={`https://www.facebook.com/nest.development/`}
              size="sm"
              radius="sm"
              isIconOnly

              target="_blank"            >
              <FaFacebookF />
            </Button>
            <Button
              href={`https://www.instagram.com/nest.dev`}
              size="sm"
              radius="sm"
              isIconOnly
              as={Link}

              target="_blank"            >
              <FaInstagram />
            </Button>
            <Button
              href={`https://x.com/nest__dev`}
              size="sm"
              radius="sm"
              isIconOnly
              as={Link}

              target="_blank"
            >
              <FaXTwitter />
            </Button>
            <Button
              href={`https://www.tiktok.com/@nest.dev`}
              size="sm"
              radius="sm"
              isIconOnly

              as={Link}

              target="_blank"
            >
              <FaTiktok />
            </Button>
          </div>
          <div className="mt-2 md:mt-0">
            <h3 className="text-sm font-medium md:text"> © 2024{" "}<span onClick={() => (window.location.href = "https://www.instagram.com/nest.dev")} className="font-bold cursor-pointer text-[#0070f0]">Games Korner</span>, All rights reserved.</h3>
          </div>
          <div className="mt-2 md:mt-0">
            <h3 className="text-sm font-medium md:text">Powered by{" "} <span onClick={() => (window.location.href = "https://www.instagram.com/nest.dev")} className="font-bold cursor-pointer">NEST</span></h3>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;