import React, { useContext } from "react";
import toast from "react-hot-toast";
import { useParams, useNavigate } from "react-router-dom";
import { HomeContext } from "../context/hoem.context";
import { AuthContext } from "../context/auth.context";
import { FaRegComment } from "react-icons/fa6";
import api from "../config/axios";
import { MdDelete } from "react-icons/md";


const SinglePost = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { posts, setPosts } = useContext(HomeContext);
  const { auth } = useContext(AuthContext);

  const post = posts.find((p) => p._id === id);

  if (!post) {
    return <p>Loading...</p>;
  }

  const isLiked = post?.likes?.includes(auth?._id);

  const toggleLike = async () => {
    const updatedPosts = posts.map((p) => {
      if (p._id === post._id) {
        const alreadyLiked = p.likes?.includes(auth?._id);

        return {
          ...p,
          likes: alreadyLiked
            ? p.likes.filter((id) => id !== auth?._id)
            : [...(p.likes || []), auth?._id],
        };
      }
      return p;
    });

    setPosts(updatedPosts);

    try {
      await api.post(`/post/${post._id}/likes`);
    } catch (err) {
      console.log(err);
    }
  };

 
  const removePost = async () => {
    try {
      const res = await api.delete(`/post/${post._id}`);

      toast.success(res.data.message, {
        style: {
          background: "green",
          color: "white",
        },
      });

      setPosts((prev) => prev.filter((p) => p._id !== post._id));

      navigate("/"); // redirect after delete
    } catch (err) {
      toast.error(err.response?.data?.message, {
        style: {
          background: "red",
          color: "white",
        },
      });
    }
  };

  return (
    <div className=" py-15 overflow-x-hidden">

    <div className=" md:ml-30 p-3 flex flex-col items-center justify-center card-container w-full h-auto">
      <div className="upper flex items-center w-90 gap-5">
        <img className="h-20 w-20 rounded-full " src={post.user_id?.avatar} alt="avatar" />
        <p>{post.user_id?.username}</p>
      </div>

      <div className="main flex">
        <img className="pt-2 rounded-3xl w-85 " src={post.url} alt="post" />
      </div>

      <div className="caption capitalize p-2 font-semibold ">{post.caption}</div>

      <div className="bottom flex gap-4 items-center ">
        <p onClick={toggleLike} className="cursor-pointer bg-[#8c8888] px-4 rounded-full py-5 text-center text-2xl ">
          {isLiked ? "❤️" : "🤍"} {post?.likes?.length || 0}
        </p>

        <p
          className="cursor-pointer bg-[#8c8888] px-6 rounded-full py-6 text-center text-2xl "
          onClick={() => navigate(`/comments/${post._id}`)}
          >
          <FaRegComment />
        </p>

        <button onClick={removePost} className="px-5 py-5 text-3xl rounded-full bg-red-600" ><MdDelete /></button>
      </div>
    </div>
    </div>
  );
};

export default SinglePost;