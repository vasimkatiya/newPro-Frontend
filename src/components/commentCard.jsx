import React, { useContext } from 'react'
import { AuthContext } from '../context/auth.context'
import { CommentContext } from '../context/comment.context'
import api from '../config/axios'
import toast from 'react-hot-toast';
import { MdDelete } from "react-icons/md";


const CommentCard = ({ avatar, username,userId, text, commentId }) => {


    const { setcomment } = useContext(CommentContext);
    const {auth} = useContext(AuthContext);

    const removeComment = async () => {
        try {
            const res = await api.delete(`/comment/${commentId}`);

             toast.success(res.data.message, {
                    style: {
                        background: "green",
                        color: "white",
                    },
                    });

            setcomment(prev =>
                prev.filter(c => c._id !== commentId)
            );


        } catch (err) {
            console.log(err.response?.data);
             toast.error(err.response?.data?.message, {
                    style: {
                        background: "red",
                        color: "white",
                    },
                    });
        }
    };

    return (
        <div className="comment-card bg-violet-500 w-[90vw] m-auto p-3 rounded-3xl">
            <div className="first font-semibold items-center gap-5 flex">
                <img className='h-20 w-20 rounded-full' src={avatar} alt="" />
                <p>{auth._id == userId ? "you" : username }</p>
            </div>

            <div className="comment justify-between flex items-center">
                <p className='overflow-auto'>{text}</p>


    <button
        className="bg-red-700 text-white px-4 py-4 text-xl rounded-full"
        onClick={removeComment}
        >
        <MdDelete/>
    </button>
        </div>
        </div>
    )
}

export default CommentCard;