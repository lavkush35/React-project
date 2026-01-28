import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Home = () => {
    let navigate = useNavigate()
    let [input, setInput] = useState("")
    function handleJoin(){
        navigate(`room/${input}`)
    }
  return (
    <div className='bg-[#12181d]  w-full h-[100vh]'>

        <div className='w-[100%] h-[100vh]  flex items-center justify-center flex-col gap-[20px] '>
            <input type="text" placeholder='enter room ID' value={input} onChange={(e) => setInput(e.target.value)}
             className='outline-none border-none px-[10px] py-[20px] w-[400px] rounded-2xl bg-white text-xl' />
            <button onClick={handleJoin} className=' border-0 px-[5px] py-[10px] bg-[aqua] color-black rounded-xl text-xl'>Join Now</button>
        </div>
      
    </div>
  )
}

export default Home
