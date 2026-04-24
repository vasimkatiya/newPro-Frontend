import React, { useContext, useState } from 'react'
import api from '../config/axios';
import {Link, useNavigate} from 'react-router-dom'
import { AuthContext } from '../context/auth.context';
import toast from "react-hot-toast";


const Login = () => {

    const [username, setusername] = useState("");
    const [password, setpassword] = useState("");

    const {setAuth} = useContext(AuthContext);

    const navigate = useNavigate();

    const submitHandler = async (e)=>{
        e.preventDefault();

        try{
            const res = await api.post('/auth/login',{username,password});
            console.log(res.data);
            setAuth(res.data.user);
            console.log('success....');
             toast.success(res.data.message, {
                    style: {
                        background: "green",
                        color: "white",
                    },
                });
            navigate('/');
        }catch(err)
        {
            console.log(err.response?.data);
             toast.error(err.response?.data?.message, {
                    style: {
                        background: "red",
                        color: "white",
                    },
                    });
        }

    }


  return (
    <div>
         <div className="form-container h-screen flex items-center justify-center flex-col gap-2 ">
        <div className="heading text-2xl capitalize font-bold">
            login... !
        </div>
            <form onSubmit={submitHandler} className='bg-violet-500 md:py-16 flex gap-10 flex-col px-7 py-10 rounded-3xl'>
                <input className=' md:w-[30vw] md:px-10 h-[5vh] px-3 rounded-3xl bg-white' type="text" name='username' placeholder='username' value={username} onChange={(e)=>{
                    setusername(e.target.value)
                }} />
                <input className='h-[5vh] px-3 rounded-3xl md:w-[30vw] md:px-10  bg-white' type="password" name="password" id="" placeholder='password' value={password} onChange={(e)=>{
                    setpassword(e.target.value)
                }} />
                <button type="submit" className='bg-[#ebe6ce] capitalize md:px-1 py-3 w-40 capitalize font-semibold rounded-full m-auto '>login</button>
            </form>
                <p>iif you not register - <Link to='/register' className='text-blue-800 capitalize'>register</Link></p>
        </div>
    </div>
  )
}

export default Login