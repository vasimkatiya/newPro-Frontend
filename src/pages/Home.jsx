import React, { useContext } from 'react'
import { HomeContext } from '../context/hoem.context'
import PostCard from '../components/PostCard';

const Home = () => {

    const {posts} = useContext(HomeContext);

  return (
    <div className="w-full overflow-x-hidden">

    <div className=' m-auto w-full md:mx-20 mb-30 py-5 px-5'>
        <h1 className='text-2xl font-semibold uppercase text-center ' >welcome to sociogram</h1>
        <div className="post-con m-auto items-center justify-center overflow-x-hidden gap-5 flex flex-wrap ">
            {posts.map((p)=>{
                return <PostCard postId={p._id} userId={p.user_id?._id} username={p.user_id.username} caption={p.caption} avatar={p.user_id.avatar} image={p.url}  />
            })}
        </div>
    </div>
    </div>
  )
}

export default Home