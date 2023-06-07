import { useState, useEffect } from "react";
import { getRelatedPosts, getRecentPosts } from '../services'
import SingleWidgetPost from "./SingleWidgetPost";

const PostWidget = ({ categories, slug }) => {
    const [widgetPosts, setWidgetPosts] = useState([])

    useEffect(() => {
        if(slug) {
            getRelatedPosts(categories, slug)
                .then((result) => setWidgetPosts(result))
        } else {
            getRecentPosts()
                .then((result) => setWidgetPosts(result))
        }
    }, [slug])

    return (
        <div className="bg-transparent shadow-lg border-2 border-black rounded-lg p-8 mb-8 mx-8 lg:mx-0">
            <h3 className="text-xl mb-8 font-semibold border-b border-black pb-4">
                { slug ? "Posts Relacionados" : "Posts Recientes"}
            </h3>
            {widgetPosts.map((post, index) => (
                <SingleWidgetPost key={index} post={post}/>
            ))}
        </div>
    );
}
 
export default PostWidget;