import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom'
import api from '../config/axios';

const SearchProfile = () => {
    const {id} = useParams();

    const [User, setUser] = useState([]);
    const [posts, setposts] = useState([]);
    const [followerCount, setfollowerCount] = useState(0);
    const [followingsCount, setfollowingsCount] = useState(0);
    const [isFollow, setisFollow] = useState(null);

    const navigate = useNavigate();

    const toggleFollow = async () =>{
        try {
            
        const res = await api.post(`/follow/${id}`);
        setfollowerCount(res.data.followersCount);
        setfollowingsCount(res.data.followingCount);
        setisFollow(res.data.isFollow);
        toast.success(res.data.message,{
            style:{
                background:'green',
                color:'white'
            }
        });
        } catch (err) {
            toast.error(err.response?.data?.message,{
                style:{
                    background:'red',
                    color:'white',
                }
            });
        }
    }

    useEffect(() => {
     
        const fetchData = async () =>{
            try {
                const res = await api.get(`/user/${id}`);
                console.log(res.data.isUser);
                setUser(res.data.isUser);
                setposts(res.data.posts);
                setfollowerCount(res.data.followerCount);
                setfollowingsCount(res.data.followingsCount);
            } catch (err) {
                toast.error(err.response?.data?.message)
            }
        }

        fetchData();

    }, [id]);
    

  return (
    <div className='md:m-30 mb-30 overflow-x-hidden'>
        <div className="profile-con">
            <div className="top py-10">
                <div className="user flex flex-col items-center gap-3 font-bold text-3xl">
                    <img className='h-50 w-50 rounded-full' src={User.avatar} alt="" />
                    <h3>{User.username}</h3>
                </div>
                <div className="follow flex w-full justify-evenly text-2xl capitalize p-2">
                    <p>followers : {followerCount}</p>
                    <p>followings : {followingsCount}</p>
                </div>
                <div className="btn w-full flex items-center justify-center mt-5">
                    <button className={`text-xl cursor-pointer font-semibold capitalize px-13 rounded-full py-5 ${isFollow ? "bg-red-600 hover:bg-red-500"  : "bg-green-600 hover:bg-green-500" }`} onClick={(e)=>{
                        e.preventDefault();
                        toggleFollow();
                    }} >{isFollow ? "unfollow" : "follow"}</button>
                </div>
            </div>

            <div className="post-con flex gap-5 m-auto justify-center items-center flex-wrap w-full">
                    {!posts ? <h2>no posts yet</h2>  : posts.map((p)=>{
                        return <div className="card  flex " key={p._id}>
                                    <img className='cursor-pointer md:h-150 h-70 w-full m-auto rounded-xl' src={p.url} alt="" onClick={()=>{
                                    navigate(`/post/${p._id}`);            
                                    }} />
                               </div>
                    })}
            </div>
        </div>
    </div>
  )
}

export default SearchProfile