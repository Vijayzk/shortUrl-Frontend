import React, { useEffect } from 'react'
import Navbar from './Navbar'
import axios from 'axios'
import { useState } from 'react'
import pic from '/pic.avif'
import { Link } from 'react-router-dom'

const Profile = () => {

    const [userInfo, setUserInfo] = useState()
    const token = localStorage.getItem('token')
    axios.defaults.headers.common = { 'Authorization': `Bearer ${token}` }

    //Get user info
    const getUserInfo = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_BACKNED}/user/info`)
            setUserInfo(response.data.user)
            //console.log(response.data.user)

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getUserInfo();
    }, [])

    return (



        <>
            <Navbar login={true} userInfo={userInfo} />
            <div className='flex flex-col items-center justify-center md:mt-14 mt-6'>
                <h1 className='text-centre font-semibold text-2xl md:text-3xl text-blue-500'> Your Profile Details</h1>
                {
                    userInfo ?
                        <div className="card bg-base-100 md:w-1/2 w-full">
                            <figure>
                                <img
                                    className='w-48 h-48 mt-4 md:mt-6'
                                    src={userInfo ? userInfo?.profileImage : pic}
                                    alt="Shoes" />
                            </figure>

                            <div className="flex flex-col mx-14 md:mx-20 mt-10 mb-10 space-y-10">
                                <label className="input input-bordered flex items-center gap-2 font-semibold">
                                    Name:
                                    <input type="text" className="grow font-normal" value={userInfo?.name} readOnly />
                                </label>
                                <label className="input input-bordered flex items-center gap-2 font-semibold">
                                    Email:
                                    <input type="text" className="grow font-normal" value={userInfo?.email} readOnly />
                                </label>
                                <label className="input input-bordered flex items-center gap-2 font-semibold">
                                    Password:
                                    <input type="text" className="grow font-normal" value={userInfo?.password} readOnly />
                                </label>
                            </div>

                        </div>
                        : <span className="loading loading-spinner loading-lg mt-28 mb-28"></span>
                }
                <Link to={'/dashboard'}><button className='bg-black p-1 mb-10 text-white w-24 h-10 rounded-lg'>Back</button></Link>
            </div>
        </>
    )
}

export default Profile
