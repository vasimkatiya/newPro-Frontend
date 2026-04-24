import { FaRegComment } from "react-icons/fa6";
import api from '../config/axios';
import { useContext } from "react";
import { CommentContext } from "../context/comment.context";
import { HomeContext } from "../context/hoem.context";
import { AuthContext } from "../context/auth.context";
import { MdDelete } from "react-icons/md";
import { Navigate, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";


const PostCard = ({ username, avatar, image,userId, postId ,caption}) => {

    const navigate = useNavigate();
    
    const { posts, setPosts } = useContext(HomeContext);
    const { auth } = useContext(AuthContext);

    const post = posts.find(p => p._id === postId);

    const isLiked = post?.likes?.includes(auth?._id);

    const toggleLike = async () => {
    const updatedPosts = posts.map((p) => {
        if (p._id === postId) {
            const alreadyLiked = p.likes?.includes(auth._id);

            return {
                ...p,
                likes: alreadyLiked
                    ? p.likes.filter(id => id !== auth?._id)
                    : [...(p.likes || []), auth?._id]
            };
        }
        return p;
    });

    setPosts(updatedPosts);

    try {
        await api.post(`/post/${postId}/likes`);
    } catch (err) {
        console.log(err);
    }
    };

    const removePost = async () => {
        try {
            const res = await api.delete(`/post/${postId}`);

             toast.success(res.data.message, {
                    style: {
                        background: "green",
                        color: "white",
                    },
                    });

            setPosts(prev =>
                prev.filter(c => c._id !== postId)
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
        <div className="card-container md:w-120 h-auto p-5 rounded-4xl mt-5 bg-[#e4e4e4] shadow-md hover:shadow-xl transition-shadow duration-300"  >

            <div className="upper flex gap-3 items-center w-full rounded-full m-auto px-8 py-2 mb-2  bg-[#c8c4c4]" onClick={()=>{
           return navigate(`/user/${userId}`);
        }}>
                <img  className="w-18 h-18 rounded-full" src={avatar} alt="avatar" />
                <p className="text-2xl" >{username}</p>
            </div>

            <div className="main flex items-center justify-center p-1 " onClick={()=>{
           return navigate(`/post/${postId}`);
        }} >
                <img className="h-[60vh] rounded-3xl " src={image} alt="post" />
            </div>
            <div className="caption capitalize font-semibold m-1">
                {caption}
            </div>

            <div className="bottom flex justify-between ">

    
                <p onClick={toggleLike} className="cursor-pointer bg-[#8c8888] px-3 rounded-full py-5 text-2xl  ">
                    {isLiked ? "❤️" : "🤍"} {post?.likes?.length}
                </p>

                <p
                    onClick={async () => {
                        try {
                            navigate(`/comments/${postId}`);
                        } catch (err) {
                            console.log(err.response?.data);
                        }
                    }}

                    className="cursor-pointer bg-[#8c8888] px-6 rounded-full py-6 text-center text-2xl "
                >
                    <FaRegComment />
                </p>

            
              <button onClick={removePost} className="px-5 py-5 text-3xl rounded-full bg-red-600 cursor-pointer hover:bg-red-500 duration-300" ><MdDelete /></button>

            </div>
        </div>
    );
};

export default PostCard;