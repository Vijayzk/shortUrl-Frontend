import React, { useState } from 'react'
import axios from 'axios'
import Navbar from './Navbar'
import { useNavigate } from 'react-router-dom'

const Login = () => {
   
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error,setError] = useState('')

    const navigate = useNavigate()
    
    const handleLogin = async(e) => {
        e.preventDefault()

        if(!email||!password){
            setError('Enter your details!')
            return;
        }
        setError('')

        //Login Api
        try {
            const userInfo = {
                email:email,
                password:password,
            }

            const response = await axios.post(`${import.meta.env.VITE_BACKNED}/user/login`,userInfo)

            if(response.data && response.data.error){
                setError(response.data.error)
            }

            //console.log(response.data);

            if(response.data && response.data.accessToken){
                localStorage.setItem('token',response.data.accessToken)
                navigate('/dashboard')

            }

        } catch (error) {
            console.log(error)
        }

    }

    return (
        <>
            <Navbar name={'Signup'} login={false}/>
            <div className='flex flex-col items-center justify-center mt-20'>
                <div className='mb-14'>
                    <p className='text-xl md:text-3xl text-center text-black'>Login to create short urls.</p>
                </div>
                <div className='w-72 md:w-96 border rounded-md bg-white px-7 py-10 shadow-lg h-80 md:h-full'>
                    <form onSubmit={handleLogin}>
                        <h4 className="text-2xl mb-7 text-blue-500 text-center">Login</h4>

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
                            className='input-box w-full py-3 mr-3 px-5 text-sm mb-2 border-[1.5px] outline-none bg-transparent'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        {error && <span className='text-xs text-red-500'>{error}</span>}
                        <button type='submit' className='bg-blue-500 hover:bg-blue-600 w-full py-2 text-white text-sm rounded mt-2 '>Login</button>

                    </form>
                </div>
            </div>
        </>
    )
}

export default Login
