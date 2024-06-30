'use client'
import { Button, Card, CardFooter, CardHeader, Divider, Image, Link } from "@nextui-org/react";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { IoMdRefresh } from "react-icons/io";
import { changeDateFormat } from "@/functions/changeDateFormat";

interface IProps {
    posts: any
}
const Fav = ({ posts }: IProps) => {
    const router = useRouter()
    const { slug } = useParams();

    const user = useSelector((state: any) => state.user)
    const token = useSelector((state: any) => state.token)
    const handleSubmit = async (id: any) => {

        const allData = {
            postId: id,
        }
        const options = {
            method: "DELETE",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'accesstoken': `${"accesstoken_"}${token}`,
            },
            body: JSON.stringify(allData)

        }

        const res = await fetch('/api/v1/post/delete', options)
        const resData = await res.json()

        if (resData.data.success == true) {
            toast.success(resData.data.message,
                {
                    duration: 3000,
                }
            )
            router.refresh()

        } else if (token == null) {
            toast.error('please login first', { duration: 3000 })

        } else {
            toast.error(resData.data.message, { duration: 3000 })

        }



    }

    useEffect(() => {
        console.log(posts.data)

    }, [posts])
    const refreshData = () => {
        router.refresh()
        toast.success("Data updated successfully",
            {
                duration: 3000,
            }
        )
    }
    return <>
        <div className="container mx-auto px-4 py-4">
            <div className={"flex justify-center items-center flex-col mb-3"}>
                <Button isIconOnly startContent={<IoMdRefresh />} onClick={() => refreshData()} size="sm" radius="sm" color="danger" variant="flat"></Button>
            </div>
            <div className="grid w-full grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
                {posts.data.map((game: any) =>
                    <Card shadow="md" key={game._id}>
                        <div className="p-0 relative">
                            <Image isLoading={false} loading='lazy' draggable={false} alt={game.name} className="z-0 h-[250px] md:h-[300px] rounded-t-lg  w-[1000px]  object-cover" src={game.imageUrl} />
                        </div>
                        <CardFooter className={`flex flex-col items-start  space-y-2 `}>
                            <div className="mb-2 text-2xl text-wrap font-bold tracking-tight hover:underline hover:cursor-pointer" onClick={() => router.push(`/${game.slug}`)}>{game.title}</div>
                            <div className=" text-tiny "><span className="text-tiny font-medium"></span> <span className="font-bold ">{changeDateFormat(game.updatedAt)}</span></div>
                            <Divider className="my-4 rounded-full" />
                            <div className="flex flex-col space-y-2  w-full  pt-2">
                                <Button as={Link} radius="sm" className='w-full' color="default" onClick={() => router.push(`/${game.slug}`)} showAnchorIcon>View Game</Button>
                                {user?._id != slug ?
                                    "" :
                                    <Button onClick={() => handleSubmit(game._id)} color="primary" radius="sm" className='w-full' >Delete</Button>
                                }
                            </div>
                        </CardFooter>
                    </Card>
                )}

            </div>
        </div>
    </>;
};

export default Fav;