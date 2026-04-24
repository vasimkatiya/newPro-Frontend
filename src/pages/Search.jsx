import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import api from '../config/axios'
import { useNavigate } from 'react-router-dom';

const Search = () => {

  const [query, setquery] = useState("");
  const [result, setresult] = useState([]);

  const navigate = useNavigate();

    
    const fetchData = async()=>{
      try {
        const res = await api.get(`/user/all?query=${query}`);
        console.log(res.data);
        setresult(res.data?.users);
        toast.success(res.data.message,{
          style:{
            background:'green',
            color:'white'
          }
        })
      } catch (err) {
        toast.error(err.response?.data?.message,{
          style:{
            background:'red',
            color:'white'
          }
        });
      }
    }
   

  return (
    <div className=' py-5 gap-7 w-full flex flex-col m-auto justify-center items-center' >
      <div className="search-form ">
        <form action="" className='flex w-full gap-3'  onSubmit={(e)=>{
          e.preventDefault();
          fetchData();
        }}>
          <input className='h-10 rounded-full px-5 py-2 w-[50vw] border-1  ' type="text" name="query" placeholder='search username' id="" onChange={(e)=>setquery(e.target.value)} />
          <button type='submit' className='bg-violet-600 text-white px-8 capitalize font-semibold rounded-3xl' >find</button>
        </form>
      </div>
      <div className="user-con flex flex-col gap-5 w-[90%] md:w-[40%] " >
        {result.map((r)=>{
          return <div className='flex py-2 rounded-full cursor-pointer justify-evenly gap-12 items-center w-full bg-[#bababa]' onClick={()=>{
            navigate(`/user/${r._id}`);
          }} >
                    <img className='border-2 rounded-full h-30 w-30' src={r.avatar} alt="" />
                    <p className='text-2xl'>{r.username}</p>
                 </div>
        })}
      </div>
    </div>
  )
}

export default Search