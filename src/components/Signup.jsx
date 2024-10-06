import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const Signup = () => {

    const [fullname, setFullName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [picture,setPicture] = useState()
    const [error,setError] = useState('')

    const naviagte = useNavigate()
    
    
    const handleSignup = async(e) => {

        e.preventDefault();

        if(!fullname || !email || !password){
            setError('Enter your details!')
            return;
        }

        setError('')
        

        //Signup Api
        try {
            const userInfo = {
                name:fullname,
                email:email,
                password:password,
                file:picture
            }
            const response = await axios.post(`${import.meta.env.VITE_BACKNED}/user/signup`,userInfo,{
                headers:{
                    'Content-Type':'multipart/form-data',
                }
            })

            if(response.data && response.data.error){
                setError(response.data.error)
            }

            if(response.data && response.data.accessToken){
                localStorage.setItem('token', response.data.accessToken)
                naviagte('/dashboard')
            }

        } catch (error) {
            console.log(error)
        }
        
    }

    return (
        <>
            <Navbar name={'Login'} login={false} />
            <div className='flex flex-col items-center justify-center mt-14 md:mt-20'>
                <div className='mb-8 md:mb-14'>
                    <p className='text-xl md:text-3xl text-center text-black'>SignUp to create short urls.</p>
                </div>
                <div className='w-72 md:w-96 border rounded-md bg-white px-7 py-10 shadow-lg h-96 md:h-full'>
                    <form onSubmit={handleSignup}>
                        <h4 className="text-2xl mb-7 text-blue-500 text-center">Signup</h4>

                        <input
                            type="text"
                            placeholder='Enter your name'
                            className='input-box w-full py-3 mr-3 px-5 text-sm mb-4 border-[1.5px] outline-none bg-transparent'
                            value={fullname}
                            onChange={(e) => setFullName(e.target.value)}
                        />

                        <input
                            type="text"
                            placeholder='Enter your email'
                            className='input-box w-full py-3 mr-3 px-5 text-sm mb-4 border-[1.5px] outline-none bg-transparent'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />

                        <input
                            type="text"
                            placeholder='Enter your password'
                            className='input-box w-full py-3 mr-3 px-5 text-sm mb-4 border-[1.5px] outline-none bg-transparent'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />

                        <input
                            type="file"
                            className='file-input w-72 md:w-full max-w-xs h-8 md:h-10 mb-4'
                            onChange={(e) => setPicture(e.target.files[0])}
                        />

                        {error && <span className='text-xs text-red-500'>{error}</span>}

                        <button type='submit' className='bg-blue-500 hover:bg-blue-600 w-full py-2 text-white text-sm rounded md:mt-2'>Signup</button>

                    </form>
                </div>
            </div>
        </>
    )
}

export default Signup
