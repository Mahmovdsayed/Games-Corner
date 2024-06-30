'use client'
import React, { useEffect, useState } from "react";
import { Card, CardHeader, Image, Button, Chip } from "@nextui-org/react";
import LoadingScreen from "../Layout/LoadingScreen";
import { useParams } from 'next/navigation';
import { FaImages } from "react-icons/fa";

interface IProps {
    name: string;
}

const Screenshot = ({ name }: IProps) => {
    const { slug } = useParams();
    const [images, setImages] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const apiKey = process.env.API_KEY;

    useEffect(() => {
        const fetchScreenshots = async () => {
            try {
                setLoading(true);
                const response = await fetch(`https://api.rawg.io/api/games/${slug}/screenshots?key=${apiKey}`, { mode: "cors" });
                const data = await response.json();
                setImages(data.results);
            } catch (error) {
                console.error('Error fetching screenshots:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchScreenshots();
    }, [slug, apiKey]);

    return <>
        <div className={(images && images.length === 0) ? 'hidden' : ''}>
            <Chip startContent={<FaImages />} color="primary" className="my-4 px-2 mx-4" variant="solid" radius="sm">Screenshots</Chip>
            <p className='mb-4 mx-4 text-sm md:text-lg font-medium text-wrap '>Explore the world of <span className="font-bold text-[#0070f0]">{name}</span> through captivating images showcasing its immersive environments and dynamic gameplay.</p>
        </div>
        <div className="my-4 gap-2 grid grid-cols-12 grid-rows-2 px-4">
            {loading ? (
                <LoadingScreen />
            ) : (
                <>
                    {/* Top row */}
                    <Card className="col-span-12 md:col-span-4 h-full w-full">
                        {images.length > 0 && (
                            <>
                                <CardHeader className="absolute z-10 top-1 flex-col items-start">
                                    <p className="text-tiny text-white/60 uppercase font-bold">Screenshot 1</p>
                                    <h4 className="text-white font-medium text-large">{name}</h4>
                                </CardHeader>
                                <Image
                                    removeWrapper
                                    alt="Screenshot 1"
                                    className="z-0 w-full h-full object-cover"
                                    src={images[0].image}
                                />
                            </>
                        )}
                    </Card>
                    <Card className="col-span-12 md:col-span-4 h-full w-full">
                        {images.length > 1 && (
                            <>
                                <CardHeader className="absolute z-10 top-1 flex-col items-start">
                                    <p className="text-tiny text-white/60 uppercase font-bold">Screenshot 2</p>
                                    <h4 className="text-white font-medium text-large">{name}</h4>
                                </CardHeader>
                                <Image
                                    removeWrapper
                                    alt="Screenshot 2"
                                    className="z-0 w-full h-full object-cover"
                                    src={images[1].image}
                                />
                            </>
                        )}
                    </Card>
                    <Card className="col-span-12 md:col-span-4 h-full w-full">
                        {images.length > 2 && (
                            <>
                                <CardHeader className="absolute z-10 top-1 flex-col items-start">
                                    <p className="text-tiny text-white/60 uppercase font-bold">Screenshot 3</p>
                                    <h4 className="text-white font-medium text-large">{name}</h4>
                                </CardHeader>
                                <Image
                                    removeWrapper
                                    alt="Screenshot 3"
                                    className="z-0 w-full h-full object-cover"
                                    src={images[2].image}
                                />
                            </>
                        )}
                    </Card>

                    {/* Center large image */}
                    <Card className="col-span-12 md:col-span-12 h-[600px]">
                        {images.length > 3 && (
                            <>
                                <CardHeader className="absolute z-10 top-1 flex-col items-start">
                                    <p className="text-tiny text-white/60 uppercase font-bold">Main Screenshot</p>
                                    <h4 className="text-white font-medium text-large">{name}</h4>
                                </CardHeader>
                                <Image
                                    removeWrapper
                                    alt="Main Screenshot"
                                    className="z-0 w-full h-full object-cover"
                                    src={images[3].image}
                                />
                            </>
                        )}
                    </Card>

                    {/* Bottom row */}
                    <Card className="col-span-12 md:col-span-6 h-[300px]">
                        {images.length > 4 && (
                            <>
                                <CardHeader className="absolute z-10 top-1 flex-col items-start">
                                    <p className="text-tiny text-white/60 uppercase font-bold">Screenshot 4</p>
                                    <h4 className="text-white font-medium text-large">{name}</h4>
                                </CardHeader>
                                <Image
                                    removeWrapper
                                    alt="Screenshot 4"
                                    className="z-0 w-full h-full object-cover"
                                    src={images[4].image}
                                />
                            </>
                        )}
                    </Card>
                    <Card className="col-span-12 md:col-span-6 h-[300px]">
                        {images.length > 5 && (
                            <>
                                <CardHeader className="absolute z-10 top-1 flex-col items-start">
                                    <p className="text-tiny text-white/60 uppercase font-bold">Screenshot 5</p>
                                    <h4 className="text-white font-medium text-large">{name}</h4>
                                </CardHeader>
                                <Image
                                    removeWrapper
                                    alt="Screenshot 5"
                                    className="z-0 w-full h-full object-cover"
                                    src={images[5].image}
                                />
                            </>
                        )}
                    </Card>
                </>
            )}
        </div>
    </>
};

export default Screenshot;
