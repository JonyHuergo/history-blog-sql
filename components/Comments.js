import React, { useEffect, useState } from 'react';
import { getComments } from '../services';
import Comment from './Comment';


const Comments = ({slug}) => {
    const [comments, setComments] = useState([]);

    useEffect(() => {
        getComments(slug).then((result) => {
            setComments(result);
        });
    }, []);

    return (
         <>
        {comments.length > 0 && (
            <div className="bg-white shadow-lg rounded-lg p-8 pb-12 mb-8">
            <h3 className="text-xl mb-8 font-semibold border-b pb-4">
                {comments.length}
                {' '}
                {comments.length > 1 ? "Comentarios" : "Comentario" }
            </h3>
                {comments.map((comment, index) => (
                    <Comment index={index} comment={comment}/>
                ))}
            </div>
        )}
        </>
    );
}
 
export default Comments;