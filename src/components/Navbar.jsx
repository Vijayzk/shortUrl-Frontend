import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import pic from '/pic.avif'


const Navbar = ({ userInfo, name, login }) => {

    const navigate = useNavigate()

    const onLogout = () => {
        localStorage.clear()
        navigate('/')
    }



    return (
        <>
            <div className="navbar bg-base-100 space-x-2 border shadow-md sticky">
                <div className="flex-1">
                    <div className="btn btn-ghost text-xl text-green-600">URLShortner</div>
                </div>
                <div className="flex-none gap-2">
                    {
                        name === 'Signup' ?
                            <Link to='/'><button className='mx-4 bg-blue-500 px-3 py-1 rounded-lg text-white text-lg'>{name}</button></Link>
                            : name === 'Login' ?
                                <Link to='/login'><button className='mx-4 bg-blue-500 px-3 py-1 rounded-lg text-white text-lg'>{name}</button></Link>
                                : " "

                    }
                    {
                        login ?
                            <div>
                                <div className='hidden md:flex flex-row space-x-6 mx-6'>
                                    <Link to={'/profile'}>
                                        <button className="bg-green-600 p-2 rounded-lg text-white font-semibold">
                                            Profile
                                        </button>
                                    </Link>
                                    <button className="bg-black text-white p-2 font-semibold rounded-lg" onClick={onLogout}>
                                        Logout
                                    </button>
                                    <div className="w-10 rounded-full">
                                        <img
                                            className='rounded-full'
                                            alt="Img"
                                            src={userInfo ? userInfo?.profileImage : pic} />
                                    </div>
                                </div>
                                <div className="dropdown dropdown-end mx-4 md:hidden">
                                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                        <div className="w-10 rounded-full border border-slate-600">
                                            <img
                                                alt="Tailwind CSS Navbar component"
                                                src={userInfo ? userInfo?.profileImage : pic} />
                                        </div>
                                    </div>
                                    <ul
                                        tabIndex={0}
                                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                                        <li>
                                            <Link to={'/profile'} className="justify-between">
                                                Profile
                                            </Link>
                                        </li>
                                        <li><button onClick={onLogout}>Logout</button></li>
                                    </ul>
                                </div>
                            </div> : ' '
                    }

                </div>
            </div>
        </>
    )
}

export default Navbar
