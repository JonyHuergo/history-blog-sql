import { useState, useEffect } from "react";
import Image from 'next/image';
import Link from 'next/link';

const { DateTime } = require("luxon");

const FeaturedPostCard = ({ post }) => {
    const [postDate, setPostDate] = useState("");
    useEffect(() => {
        let dt = DateTime.fromISO(post.createdAt)
        setPostDate(() => dt.toLocaleString(DateTime.DATETIME_MED))
    }, []);  

    return (
        <div className="relative h-72 hover:shadow-2xl hover:scale-105">
            <div className="absolute rounded-lg bg-center bg-no-repeat bg-cover shadow-md inline-block w-full h-72" style={{ backgroundImage: `url('${post.featuredImage.url}')` }} />
            {/* <div className="absolute rounded-lg bg-center bg-gradient-to-b opacity-50 from-gray-600 via-gray-900 to-black w-full h-72" /> */}
            <div className="absolute rounded-lg bg-center bg-gradient-to-b opacity-50 from-white via-gray-100 to-gray-400 w-full h-72" />
            <div className="flex flex-col rounded-lg p-4 items-center justify-center absolute w-full h-full bg-transparent border-2 border-black">
                <p className="text-black mb-4 text-shadow font-semibold text-xs">{postDate}</p>
                <p className="text-black mb-4 text-shadow font-semibold text-2xl text-center">{post.title}</p>
                <div className="flex items-center absolute bottom-5 w-full justify-center">
                    <Image
                    unoptimized
                    alt={post.author.name}
                    height={31}
                    width={31}
                    className="align-middle drop-shadow-lg rounded-full border border-black"
                    src={post.author.photo.url}
                    />
                    <p className="inline align-middle text-black text-shadow ml-2 font-medium">{post.author.name}</p>
                </div>
            </div>
            <Link href={`/post/${post.slug}`}><span className="cursor-pointer absolute w-full h-full" /></Link>
        </div>
    )};

export default FeaturedPostCard;