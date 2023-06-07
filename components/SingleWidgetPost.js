import { useState, useEffect } from "react";
import Link from "next/link";

const { DateTime } = require("luxon");

const SingleWidgetPost = ({ post }) => {
    const [postDate, setPostDate] = useState("");

    useEffect(() => {
        let dt = DateTime.fromISO(post.createdAt)
        setPostDate(() => dt.toLocaleString(DateTime.DATETIME_MED))
    }, []);

    return (
        <article className="flex items-center w-full mb-4">
            <div className="w-16 flex-none">
                <img
                    alt={post.title}
                    height="60px"
                    width="60px"
                    className="align-middle rounded-full"
                    src={post.featuredImage.url}
                />
            </div>
            <div className="flex-grow ml-4">
                <p className="text-gray-500 font-xs">{postDate}</p>
                <Link href={`/post/${post.slug}`} className="text-md">{post.title}</Link>
            </div>
        </article>
    );
}
 
export default SingleWidgetPost;