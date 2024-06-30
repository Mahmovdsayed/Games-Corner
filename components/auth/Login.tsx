'use client'

import * as yup from "yup";
import { useFormik } from "formik";
import { useContext, useEffect, useState } from "react";
import { Bars } from "react-loader-spinner";
import { Button, Input, Image, Select, SelectItem, Link } from "@nextui-org/react";
import { MdEmail } from "react-icons/md";
import { FaAt } from "react-icons/fa6";
import { FaUserTie } from "react-icons/fa";
import { HiMiniUsers } from "react-icons/hi2";
import { FaMale } from "react-icons/fa";
import { FaFemale } from "react-icons/fa";
import { BiMaleFemale } from "react-icons/bi";
import { RiLockPasswordFill } from "react-icons/ri";
import { PiPasswordFill } from "react-icons/pi";
import { EyeSlashFilledIcon } from "@/icons/EyeSlashFilledIcon";
import { EyeFilledIcon } from "@/icons/EyeFilledIcon";
import { MdOutline123 } from "react-icons/md";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { IoLogIn } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { setLogin } from "@/state";
import React from "react";
interface IProps {

}
const Login = ({ }: IProps) => {
    const router = useRouter()
    const [isVisible, setIsVisible] = React.useState(false);
    const toggleVisibility = () => setIsVisible(!isVisible);
    const [error, setError] = useState(null);
    const dispatch = useDispatch();
    const [isLoading, setisLoading] = useState(false);
    const submitRegister = async (values: any) => {
        setisLoading(true);
        const options: any = {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(values)

        }
        try {
            const response = await fetch('/api/v1/auth/login', options)
            const res = await response.json()

            if (res.data.success == true) {
                dispatch(
                    setLogin({
                        user: res.data.userData,
                        token: res.data.token
                    })
                )

                toast.success(res.data.message, { position: 'top-center' })
                setTimeout(() => { router.push('/') }, 1000)

            } else if (res.data.success == false) {
                toast.error(res.data.errorMsg, { position: 'top-center' })
            }
        } catch (error: any) {
            toast.error(`An error occurred during registration`);
        }
        setisLoading(false)
    }


    let validatScheme = yup.object({
        email: yup.string().lowercase("email must be in lowercase").email("email is invalid").required("email is required"),
        password: yup
            .string()
            .required("password is required"),
    });


    let formik = useFormik({
        initialValues: {
            email: "",
            password: "",

        },
        validationSchema: validatScheme,
        onSubmit: submitRegister,
    });
    return <>
        <div className="w-full min-h-screen xl:h-screen xl:flex xl:flex-col xl:items-center xl:justify-center mt-32 xl:mt-0 px-2">
            <div className="xl:bg-white rounded-xl md:rounded-[54px]  xl:w-[75%] xl:min-h-[868px] xl:flex xl:flex-row   xl:items-center xl:justify-center relative overflow-hidden">
                <div className="absolute left-0 bottom-[10%] z-40">
                    <Image src="https://res.cloudinary.com/dxvpvtcbg/image/upload/v1719530973/gehud49dgeuztkfgg49c.svg" className="object-cover object-center hidden xl:flex md:w-full" alt="item" />
                </div>
                <div className="xl:w-[50%] m-auto text-center xl:flex xl:flex-col xl:items-center xl:justify-center ">
                    <h2 className="text-4xl font-bold lg:text-5xl uppercase">Welcome back, Hero!</h2>
                    <p className="my-2 line-clamp-6 text-default-600 font-medium text-tiny md:text-medium text-wrap ">
                        We are glad to see you back with us
                    </p>
                    <form onSubmit={formik.handleSubmit} className=" my-4 p-4">
                        <Input
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            value={formik.values.email}
                            id="email"
                            label="Email"
                            name="email"
                            className="w-full  xl:min-w-[370px] mb-4"
                            labelPlacement="inside"
                            size="lg"
                            type='email'
                            radius="sm"
                            placeholder="Enter your Email"
                            variant="underlined"
                            color="primary"
                        />
                        {formik.errors.email && formik.touched.email ? (
                            <div className="text-red-400 text-tiny p-1 ">
                                {formik.errors.email}
                            </div>
                        ) : (
                            ""
                        )}
                        <Input
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            value={formik.values.password}
                            id="password"
                            label="Password"
                            name="password"
                            className="w-full  xl:min-w-[370px] mb-4"
                            labelPlacement="inside"
                            size="lg"
                            radius="sm"
                            placeholder="Enter your password"
                            endContent={
                                <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
                                    {isVisible ? (
                                        <EyeSlashFilledIcon />
                                    ) : (
                                        <EyeFilledIcon />
                                    )}
                                </button>
                            }
                            type={isVisible ? "text" : "password"}
                            variant="underlined"
                            color="primary"
                        />
                        {formik.errors.password && formik.touched.password ? (
                            <div className="text-red-400 text-tiny p-1 ">
                                {formik.errors.password}
                            </div>
                        ) : (
                            ""
                        )}
                        {isLoading ? (
                            <Button radius="sm" size="lg" className="font-medium mt-4 w-full bg-[#7A679F] text-white">Loading...</Button>) :
                            (<Button type="submit" radius="sm" size="lg" className="font-medium mt-4 w-full bg-[#7A679F] text-white">LOGIN</Button>)
                        }                    </form>
                    <p className="">Don't have an account? <Link href="/signup" showAnchorIcon className="font-bold text-[#7A679F] cursor-pointer">Sign up</Link></p>
                </div>
                <div className="hidden xl:flex xl:w-[50%] h-full p-0 relative">
                    <Image
                        removeWrapper
                        radius="none"
                        src="https://res.cloudinary.com/dxvpvtcbg/image/upload/v1719529246/aju8ztxr0gb0c7sr05em.jpg"
                        className="rounded-r-[54px] w-full h-full object-cover object-center z-10"
                    />
                    <div className="bg-[#FEAB78] backdrop-blur-xl backdrop-filter rounded-br-lg absolute top-0  p-4 z-40">
                        <h3 className="text-white text-lg uppercase font-semibold">From Upcoming Games</h3>
                    </div>
                    <div className="bg-white/10 backdrop-blur-md backdrop-filter rounded-br-[54px] w-full absolute bottom-0 p-5 z-40">
                        <h3 className="text-white text-2xl uppercase font-semibold mb-2">GRAND THEFT AUTO VI</h3>
                        <p className="text-tiny text-white font-medium">WELCOME TO LEONIDA Grand Theft Auto VI heads to the state of Leonida, home to the neon-soaked streets of Vice City and beyond in the biggest, most immersive evolution of the Grand Theft Auto series yet.
                            add to favorites</p>
                        <Button as={Link} showAnchorIcon href="/grand-theft-aito-vi" className="w-full bg-[#f0f0f0]/40 backdrop-blur-3xl backdrop-filter text-white mt-3 font-medium" radius="sm" >
                            View Game
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    </>;
};

export default Login;