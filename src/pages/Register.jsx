import React, { useState } from 'react'
import {Link} from 'react-router-dom'
import api from '../config/axios.js';
import {useNavigate} from 'react-router-dom'
import toast from "react-hot-toast";

const Register = () => {

    const navigate = useNavigate();

    const [username, setusername] = useState("");
    const [password, setpassword] = useState("");
    const [avatar, setavatar] = useState(null);

    const submitHandler = async (e)=>{
        e.preventDefault();

        if(!username.trim() || !password.trim() || !avatar)
        {
            return console.error('all fields are required.');
        }

        const formData = new FormData();

        formData.append("username",username);
        formData.append("password",password);
        formData.append("avatar",avatar);

       try {
    const res = await api.post('/auth/register', formData);
    console.log(res.data);
    console.log('success.....');
    toast.success(res.data.message)
    navigate('/login');
    
} catch (err) {
    console.log(err.response?.data);
    toast.error(err.response?.data?.message)
}
        
    }


  return (
    <div>
        <div className="form-container h-screen flex items-center justify-center flex-col gap-2 ">
        <div className="heading text-2xl capitalize font-bold">
            sign up... !
        </div>
            <form onSubmit={submitHandler} className='bg-violet-500 md:py-16 flex gap-10 flex-col px-7 py-10 rounded-3xl'>
                <input className=' md:w-[30vw] md:px-10 h-[5vh] px-3 rounded-3xl bg-white' type="text" name='username' placeholder='username' value={username} onChange={(e)=>{
                    setusername(e.target.value)
                }} />
                <input className='h-[5vh] px-3 rounded-3xl md:w-[30vw] md:px-10  bg-white' type="password" name="password" id="" placeholder='password' value={password} onChange={(e)=>{
                    setpassword(e.target.value)
                }} />
                <input className='md:w-[30vw] md:px-10 h-[5vh] px-3 rounded-3xl bg-white text-center' type="file" name="avatar" id="" onChange={(e)=>{
                    let file = e.target.files[0];
                    setavatar(file);
                }} />
                <button type="submit" className='bg-[#ebe6ce] md:px-1 py-3 w-40 capitalize font-semibold rounded-full m-auto '>register</button>
            </form>
                <p>if you already register - <Link to='/login' className='text-blue-800 capitalize'>login</Link></p>
        </div>
    </div>
  )
}

export default Register