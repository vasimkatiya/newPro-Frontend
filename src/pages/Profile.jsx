import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import api from '../config/axios';
import { useNavigate } from 'react-router-dom';

const Profile = () => {

    const [User, setUser] = useState([]);
    const [posts, setposts] = useState([]);
    const [followerCount, setfollowerCount] = useState(0);
    const [followingsCount, setfollowingsCount] = useState(0);

    const navigate = useNavigate();

    useEffect(() => {
      
        const fetchData = async () =>{
            try {
                
                const res = await api.get('/user');
                setUser(res.data.user);
                setposts(res.data.posts);
                setfollowerCount(res.data.followerCount);
                setfollowingsCount(res.data.followingsCount);

            } catch (err) {
                toast.error(err.response?.data?.message,{
                    style:{
                        background:'red',
                        color:'white'
                    }
                });
            }
        }

        fetchData();

    }, [posts,followerCount,followingsCount]);
    

  return (
    <div className=' mb-30 md:m-30 overflow-x-hidden'>
        <div className="upper">
            <div className="first flex flex-col items-center gap-2.5 text-2xl font-bold py-5">
                <img className='w-50 h50 rounded-full' src={User.avatar} alt="" />
                <h3>{User.username}</h3>
            </div>
            <div className="follow flex w-full justify-evenly text-xl capitalize font-semibold p-2 ">
                <p>followers : {followerCount}</p>
                <p>followings : {followingsCount}</p>
            </div>
            <div className="btns flex justify-center m-5 ">
                <button className='bg-red-600 px-10 py-4 capitalize font-semibold text-white rounded-full text-2xl' onClick={async(e)=>{
                    await api.get('/auth/logout');
                    navigate('/login');
                }} >logout</button>
            </div>
        </div>
        <div className="post-sec gap-10 flex items-center justify-center flex-wrap">
            {posts.map((p)=>{
                return <div className='flex'>
                <img  className='md:h-140 h-70 w-full m-auto rounded-xl' onClick={()=>{
                    navigate(`/post/${p._id}`)
                }} src={p.url} alt="" />
                </div>
            })}
        </div>
    </div>
  )
}

export default Profile