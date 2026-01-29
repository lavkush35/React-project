import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Home = () => {
    let [input, setInput] = useState("");
    let navigate = useNavigate()
    function handleJoin() {
        navigate(`/room/${input}`)
    }
  return (
    <div className='home'>
      <input type="text" placeholder='enter your roomId...' onChange={(e) => setInput(e.target.value)} value={input} />
      <button onClick={handleJoin}>Join Now</button>
    </div>
  )
}

export default Home
