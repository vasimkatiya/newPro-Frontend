import React, { useContext, useEffect, useState } from 'react'
import { CommentContext } from '../context/comment.context'
import CommentCard from '../components/commentCard';
import api from '../config/axios';
import { useNavigate, useParams } from 'react-router-dom';
import { RiSendPlaneFill } from "react-icons/ri";
import toast from 'react-hot-toast';

const Comments = () => {

    const navigate = useNavigate();
    const [text, settext] = useState("")
    const {comment,setcomment} = useContext(CommentContext);
    const {id} = useParams();

     const fetchData = async () =>{
        try {
            const res = await api.get(`/comment/${id}/comments`);
            console.log(res.data);
            setcomment(res.data.comments);
        } catch (err) {
            console.log(err.response?.data)
        }
    }

    const submitHandler = async(e)=>{
        e.preventDefault();

        try {
            await api.post(`/comment/${id}/comments`,{text});
            settext("");
            toast.success("success !", {
                style: {
                    background: "green",
                    color: "white",
                },
            });

        fetchData();

            navigate(`/comments/${id}`);
        } catch (err) {
            console.log("only comment creator can delete his comments"||err.response?.data);
             toast.error(err.response?.data?.message, {
                    style: {
                        background: "red",
                        color: "white",
                    },
                });
        }
    }

    useEffect(() => {

    fetchData();
      
    }, [id])
    

  return (
    <div className='overflow-x-hidden md:ml-30'>
        <h1 className='text-2xl p-1 text-center capitalize font-bold' >comments</h1>
        <div className="comment-container flex flex-col gap-5 mb-30">
            {comment?.map((c)=>{
                return <CommentCard
                            key={c?._id}
                            commentId={c._id}
                            userId={c?.user_id?._id}
                            avatar={c.user_id?.avatar}
                            username={c.user_id?.username}
                            text={c.text}
                        />
            })}
        </div>


        <div className="create-comment">
            <form className='flex items-center fixed m-auto w-[100vw]
            gap-3 justify-center bottom-35' onSubmit={submitHandler} >
                <input className='h-[5vh] w-[50%] z-10 px-3 rounded-3xl md:w-[30vw] md:px-10  bg-white border-1' type="text" name='text' placeholder='comment on the post' value={text} onChange={(e)=>settext(e.target.value)}  />
                <button type="submit" className='h-12 text-3xl w-12 text-center  p-2 rounded-full bg-violet-600'><RiSendPlaneFill /></button>
            </form>
        </div>
    </div>
  );
};

export default Comments