'use client'
import { Button, Image, Input, Select, SelectItem } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { FaSearch } from "react-icons/fa";

interface IProps { }

interface Game {
    id: number;
    name: string;
    background_image: string;
}

const Search: React.FC<IProps> = ({ }: IProps) => {
    const [value, setValue] = useState<string>("");
    const [debouncedValue, setDebouncedValue] = useState<string>("");
    const [results, setResults] = useState<Game[]>([]);
    const apiKey = process.env.API_KEY as string;
    const router = useRouter()

    const SearchApi = async () => {
        try {
            const response = await fetch(`https://api.rawg.io/api/games?key=${apiKey}&search=${debouncedValue}&ordering=-added`, { mode: "cors" });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const dataRes = await response.json();
            setResults(dataRes.results);
        } catch (error) {
            console.error('Fetch error:', error);
        }
    };

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, 1000); // 1000ms = 1 second

        return () => {
            clearTimeout(handler);
        };
    }, [value]);

    useEffect(() => {
        if (debouncedValue.trim()) {
            SearchApi();
        } else {
            setResults([]);
        }
    }, [debouncedValue]);
    const handleClick = (slug: any) => {
        router.push(`/${slug}`)
        setValue("")
    }
    return (
        <div className="px-4 space-y-3 md:space-y-0 justify-center my-4 flex-col ">
            <Input
                variant="underlined"
                color='primary'
                isClearable

                placeholder="Search through over 800,000 games! 🎮🔍"
                size="sm"
                className="max-w-md m-auto font-bold"
                onValueChange={setValue}
                startContent={<FaSearch />}
            />
            <div className="">
                {results.length > 0 ? (
                    <ul>
                        {results.map((game: any) => (
                            <motion.li
                                key={game.id}
                                onClick={() => handleClick(game.slug)}
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 1.5 }}
                                className="flex items-center my-2 bg-white  m-auto  p-4 rounded-lg object-cover space-x-4 cursor-pointer"
                            >
                                <div className="flex items-center bg-white/40 p-2 rounded-lg backdrop-blur-md backdrop-filter space-x-4 w-full text-black">
                                    <Image src={game.background_image} alt={game.name} className="w-20 h-20 md:w-32 md:h-32 mr-4 object-cover object-center"
                                    />
                                    <span className="font-bold text-sm md:text-lg">{game.name}</span>
                                </div>

                            </motion.li>
                        ))}
                    </ul>
                ) : (
                    <p></p>
                )}
            </div>
        </div>
    );
};

export default Search;
