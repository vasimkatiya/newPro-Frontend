import React from 'react'
import { Link } from 'react-router-dom'
import { IoHomeOutline, IoAddCircleOutline } from "react-icons/io5";
// import { LuMessageCircle } from "react-icons/lu";
import { CiSearch } from "react-icons/ci";
import { FaRegUser } from "react-icons/fa";

const Navbar = () => {
    return (
        <div className='fixed bottom-0 left-0 w-full h-[10vh] bg-white border-t 
                        md:top-0 md:h-screen md:w-[80px] md:border-r md:border-t-0'>
            
            <nav className='flex flex-col items-center h-full md:px-10'>

                <h3 className="hidden md:block font-semibold text-xl py-6">
                    SG
                </h3>

                <ul className='flex justify-around items-center w-full h-full text-2xl
                               md:flex-col md:gap-10 md:justify-start md:mt-10
                               '>
                    
                    <li className='hover:text-violet-700 transition'>
                        <Link to='/'><IoHomeOutline /></Link>
                    </li>

                    {/* <li className='hover:text-violet-700 transition'>
                        <Link to='/message'><LuMessageCircle /></Link>
                    </li> */}

                    <li className='hover:text-violet-700 transition'>
                        <Link to='/post'><IoAddCircleOutline /></Link>
                    </li>

                    <li className='hover:text-violet-700 transition'>
                        <Link to='/search'><CiSearch /></Link>
                    </li>

                    <li className='hover:text-violet-700 transition'>
                        <Link to='/profile'><FaRegUser /></Link>
                    </li>

                </ul>
            </nav>
        </div>
    )
}

export default Navbar