'use client'
import { Card, CardBody, Image, Skeleton } from "@nextui-org/react";

interface IProps {

}
const list = [
    { im: "https://lol.com" }, { im: "https://lol.com" }, { im: "https://lol.com" }, { im: "https://lol.com" }, { im: "https://lol.com" }, { im: "https://lol.com" }, { im: "https://lol.com" }, { im: "https://lol.com" }, { im: "https://lol.com" }, { im: "https://lol.com" }, { im: "https://lol.com" }, { im: "https://lol.com" }, { im: "https://lol.com" }, { im: "https://lol.com" }, { im: "https://lol.com" }, { im: "https://lol.com" }, { im: "https://lol.com" }, { im: "https://lol.com" }, { im: "https://lol.com" }, { im: "https://lol.com" }, { im: "https://lol.com" }, { im: "https://lol.com" }, { im: "https://lol.com" }, { im: "https://lol.com" }, { im: "https://lol.com" }, { im: "https://lol.com" },
]
const LoadingUpComing = ({ }: IProps) => {
    return <>
        <div className="p-4">
            <Skeleton className="rounded-lg h-[50px] w-[250px] md:w-[400px] bg-black">
                <h3 className="mb-4 text-4xl font-bold lg:text-6xl uppercase">New and Upcoming Games</h3>
            </Skeleton>
            <Skeleton className="h-[20px] my-4 bg-black rounded-lg">
                <p>Discover the latest and greatest in gaming with our selection of new and upcoming titles. Whether you're a fan of action-packed adventures, immersive simulations, or nostalgic remakes, there's something here for everyone. Stay tuned for the release of highly anticipated games like "Prince of Persia: The Sands of Time Remake," "Death Stranding 2: On the Beach," "Star Citizen," "Grand Theft Auto VI," and "MOUSE." Keep an eye on this space for updates on release dates and exclusive content.
                </p>
            </Skeleton>

            <div className="flex justify-start space-x-3 overflow-x-auto scrollbar-hide">
                {list.map((img) =>
                    <Card key={img.im} shadow="none" isPressable className="shadow-none min-w-[300px] max-w-[300px] md:min-w-[400px] md:max-w-[400px]">
                        <CardBody className="p-0">
                            <Image src={img.im} className="w-[300px] md:w-[400px] h-[300px]" isLoading />
                        </CardBody>
                    </Card>
                )}
            </div>
        </div>
    </>;
};

export default LoadingUpComing;