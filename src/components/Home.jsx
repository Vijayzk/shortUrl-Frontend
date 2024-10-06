import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import axios from 'axios'

const Home = () => {

  const [url, setUrl] = useState('')
  const [error, setError] = useState('')
  const [userInfo, setUserInfo] = useState()
  const [urls, setUrls] = useState()
  const [message, setMessage] = useState('')

  const token = localStorage.getItem('token')
  axios.defaults.headers.common = { 'Authorization': `Bearer ${token}` }

  const handleUrl = async (e) => {
    e.preventDefault()

    if (!url) {
      setError('Enter a url')
      setTimeout(() => {
        setError('')
      }, 3000)
      return
    }

    setError('')
    //Api
    try {
      const redirectURL = {
        url: url,
      };

      const response = await axios.post(`${import.meta.env.VITE_BACKNED}/url`, redirectURL)

      if (response.data && response.data.message) {
        setMessage(response.data.message)
        setTimeout(() => {
          setMessage('')
          setUrl('')
        }, 3000)
      }

      getUrls();

    } catch (error) {
      console.log(error)
    }
  }

  //Get user info
  const getUserInfo = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKNED}/user/info`)
      setUserInfo(response.data.user)

    } catch (error) {
      console.log(error)
    }
  }

  //Get Urls
  const getUrls = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKNED}/url/`)
      setUrls(response.data.urls)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getUserInfo();
    getUrls();
  }, [])

  return (
    <>
      <Navbar userInfo={userInfo} login={true} />
      <div className='mt-8 min-h-full '>
        <h1 className='text-xl md:text-3xl font-semibold text-blue-600 text-center'>URL Shortner</h1>
        <p className='text-xs md:text-lg text-center mt-2 font-semibold'>Enter your urls to shorten or to creata an alternative url to redirect to your page.</p>
        <form className='flex flex-col items-center justify-center mt-16' onSubmit={handleUrl}>
          <input
            type="text"
            placeholder='Enter your url'
            className='input-box w-80 md:w-1/3 py-3 mr-3 px-5 text-sm mb-4 border-[1.5px] outline-none bg-transparent rounded-md'
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
          {error && <span className='text-md text-red-500'>{error}</span>}
          <button className='bg-blue-500 text-white px-3 py-2 rounded-lg mt-2 w-28 h-10 md:w-1/8 md:h-12'>ShortenUrl</button>
        </form>
      </div>

      {message && <h1 className='mt-10 flex text-green-500 justify-center items-center text-center text-lg'>{message}</h1>}
      <h1 className='text-center mb-12 text-xl md:text-3xl mt-20 underline'>Your URL's</h1>
      <div className="overflow-x-auto mx-20 mb-10">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th className='md:text-lg'>SNo</th>
              <th className='md:text-lg'>ShortUrl</th>
              <th className='md:text-lg'>RedirectUrl</th>
              <th className='md:text-lg'>No of Clicks</th>
            </tr>
          </thead>

          {
            urls ? urls.map((data, index) => (

              <tbody key={data._id}>
                <tr>
                  <th>{index + 1}</th>
                  <td><a href={`${import.meta.env.VITE_BACKNED}/url/${data.shortId}`} target='_blank' className='cursor-pointer text-blue-500 font-semibold'>{`urlshortner-backend-9ole.onrender.com/url/${data.shortId}`}</a></td>
                  <td className='font-semibold'>{data.redirectURL}</td>
                  <td className='font-semibold'>{data.visitHistory?.length}</td>
                </tr>
              </tbody>

            )) :
              <tbody>
                <tr>
                  <th><span className="md:mt-10 mt-4 loading loading-dots loading-lg mx-10 md:hidden block"></span></th>
                  <th></th>
                  <th>
                    <span className="md:mt-10 mt-4 loading loading-dots loading-lg mx-10 hidden md:block"></span>
                  </th>
                  <th></th>
                </tr>
              </tbody>
          }
        </table>
      </div>
    </>
  )
}

export default Home
