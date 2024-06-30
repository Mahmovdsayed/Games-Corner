"use client"
import { IoHome, IoLogOut, IoSettingsSharp } from "react-icons/io5";
import { GiApc } from "react-icons/gi";
import { GiFloatingPlatforms } from "react-icons/gi";
import { FaHeart, FaTags, FaUserAlt } from "react-icons/fa";
import { LiaStoreSolid } from "react-icons/lia";
import { useParams, usePathname } from "next/navigation";
import { MdLocalMovies, MdVerified } from "react-icons/md";
import { IoTvSharp, IoSearchSharp } from "react-icons/io5";
import { FaUsers } from "react-icons/fa";
import React, { useEffect, useState } from "react";
import { MdUpcoming } from "react-icons/md";
import {
    Navbar,
    NavbarBrand,
    Button,
    NavbarContent,
    NavbarItem,
    NavbarMenuToggle,
    DropdownItem,
    DropdownTrigger,
    Image,
    Tabs,
    Tab,
    Dropdown,
    NavbarMenu,
    NavbarMenuItem,
    DropdownMenu,
    Avatar,
    Link,
    User,
} from "@nextui-org/react";
import { FaCode } from "react-icons/fa6";

import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { setLogout } from "@/state";
export default function Nav() {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    const router = useRouter();
    const pathname = usePathname();
    const { slug } = useParams();
    const user = useSelector((state: any) => state.user)
    const dispatch = useDispatch()
    useEffect(() => {

    }, [user])
    const logout = () => {
        dispatch(setLogout())
        router.push('/')
    }
    const menuItemsLogin = [
        {
            text: `Profile`,
            link: `/user/${user?._id}`
        },


        {
            text: 'Home',
            link: '/'
        },
        {
            text: 'genres',
            link: '/genres'
        },
        {
            text: 'platforms',
            link: '/platforms'
        },
        {
            text: 'tags',
            link: '/tags'
        },
        {
            text: 'stores',
            link: '/stores'
        },
        {
            text: 'developers',
            link: '/developers'
        },
        {
            text: 'upcoming games',
            link: '/upcoming'
        },
        {
            text: 'Favourites',
            link: `/user/${user?._id}`
        },
        {
            text: 'settings',
            link: `/settings`
        },
    ];
    const menuItemsmain = [
        {
            text: 'Home',
            link: '/'
        },
        {
            text: 'genres',
            link: '/genres'
        },
        {
            text: 'platforms',
            link: '/platforms'
        },
        {
            text: 'tags',
            link: '/tags'
        },
        {
            text: 'stores',
            link: '/stores'
        },
        {
            text: 'developers',
            link: '/developers'
        },
        {
            text: 'upcoming games',
            link: '/upcoming'
        },
    ];

    return <>
        {user ?
            <div>
                <Navbar isBlurred onMenuOpenChange={setIsMenuOpen}>
                    <NavbarContent>
                        <NavbarMenuToggle
                            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                            className="sm:hidden"
                        />
                        <NavbarBrand>
                            <p className="font-bold uppercase">Games Corner</p>
                        </NavbarBrand>
                    </NavbarContent>
                    <NavbarContent justify="end">
                        <NavbarItem>
                            <Dropdown backdrop="transparent" shadow="lg" placement="bottom-end">
                                <DropdownTrigger>
                                    <Avatar
                                        isBordered
                                        as="button"
                                        className="transition-transform"
                                        color="primary"
                                        name={user?.username}
                                        radius="sm"
                                        size="sm"
                                        src={user?.image}
                                    />
                                </DropdownTrigger>
                                <DropdownMenu shouldFocusWrap selectionMode="single" aria-label="Profile Actions" color="secondary" variant="shadow">
                                    <DropdownItem as={Link} showDivider href={`/user/${user?._id}`} startContent={<FaUserAlt />} key="profile" className="h-14 gap-2 text-black ">
                                        <p className="font-semibold capitalize flex items-center">{user?.username}  <span className={user?.verifed == true ? " text-md  ms-1 md:ms-2" : "hidden"}>
                                            {" "}
                                            <MdVerified />
                                        </span></p>
                                        <p className="font-medium ">{user?.email}</p>
                                    </DropdownItem>
                                    {/* <DropdownItem className="text-black " as={Link} href={`/settings`} startContent={<IoSettingsSharp />} key="settings">Settings</DropdownItem> */}
                                    <DropdownItem startContent={<IoLogOut />} onClick={() => logout()} key="logout" color="danger">
                                        Log Out
                                    </DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
                        </NavbarItem>
                    </NavbarContent>
                    <NavbarMenu>
                        {menuItemsLogin.map((item, index) => (
                            <NavbarMenuItem key={`${item}-${index}`}>
                                <Link
                                    color={
                                        pathname == item.link ? "primary" : "foreground"
                                    }
                                    className="w-full text-4xl uppercase font-bold"
                                    href={item.link}
                                    size="lg"
                                >
                                    {item.text}
                                </Link>
                            </NavbarMenuItem>
                        ))}
                    </NavbarMenu>
                </Navbar>

            </div>
            :
            <div>
                <Navbar shouldHideOnScroll isBlurred onMenuOpenChange={setIsMenuOpen}>
                    <NavbarContent>
                        <NavbarMenuToggle
                            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                            className="sm:hidden"
                        />
                        <NavbarBrand>
                            <p className="font-bold uppercase">Games Corner</p>
                        </NavbarBrand>
                    </NavbarContent>


                    <NavbarContent justify="end">
                        <NavbarItem className="hidden lg:flex">
                            <Link size="sm" href="/login">Login</Link>
                        </NavbarItem>
                        <NavbarItem>
                            <Button as={Link} color="primary" href="/signup" size="sm" variant="solid">
                                Sign Up
                            </Button>
                        </NavbarItem>
                    </NavbarContent>
                    <NavbarMenu>
                        {menuItemsmain.map((item, index) => (
                            <NavbarMenuItem key={`${item}-${index}`}>
                                <Link
                                    color={
                                        pathname == item.link ? "primary" : "foreground"
                                    }
                                    className="w-full text-4xl uppercase font-bold"
                                    href={item.link}
                                    size="lg"
                                >
                                    {item.text}
                                </Link>
                            </NavbarMenuItem>
                        ))}
                    </NavbarMenu>
                </Navbar>

            </div>
        }

        <div className="hidden pt-4 px-2 md:flex md:items-center md:justify-center">
            <Tabs
                selectedKey={pathname}
                key="full"
                radius="sm"
                variant="underlined"
                size="sm"
                color='primary'
                aria-label="Options"
            >
                <Tab
                    id="/"
                    as={Link}
                    href="/"
                    key="/"
                    title={
                        <div className="flex items-center space-x-1">
                            <IoHome />
                            <span>Home</span>
                        </div>
                    }
                />
                <Tab
                    id="/genres"
                    href="/genres"
                    key="/genres"
                    as={Link}
                    title={
                        <div className="flex items-center space-x-1">
                            <GiApc />

                            <span>Genres</span>
                        </div>
                    }
                />
                <Tab
                    id="/platforms"
                    href="/platforms"
                    key="/platforms"
                    as={Link}
                    title={
                        <div className="flex items-center space-x-1">
                            <GiFloatingPlatforms />
                            <span>Platforms</span>
                        </div>
                    }
                />
                <Tab
                    id="/tags"
                    as={Link}
                    href="/tags"
                    key="/tags"
                    title={
                        <div className="flex items-center space-x-1">
                            <FaTags />
                            <span>Tags</span>
                        </div>
                    }
                />
                <Tab
                    id="/stores"
                    as={Link}
                    href="/stores"
                    key="/stores"
                    title={
                        <div className="flex items-center space-x-1">
                            <LiaStoreSolid />
                            <span>Stores</span>
                        </div>
                    }
                />
                <Tab
                    id="/developers"
                    as={Link}
                    href="/developers"
                    key="/developers"
                    title={
                        <div className="flex items-center space-x-1">
                            <FaCode />
                            <span>Developers</span>
                        </div>
                    }
                />
                <Tab
                    id="/upcoming"
                    as={Link}
                    href="/upcoming"
                    key="/upcoming"
                    title={
                        <div className="flex items-center space-x-1">
                            <MdUpcoming />
                            <span>Upcoming</span>
                        </div>
                    }
                />
            </Tabs>
        </div>
    </>
}