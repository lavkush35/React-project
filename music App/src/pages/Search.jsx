import React, { useEffect, useState } from 'react'
import Player from '../component/Player'
import { IoSearch } from "react-icons/io5";
import { songsData } from '../songs';
import Card from '../component/card';

function Search() {
  let [input, setInput] = useState("")
  let [newList, setnewList] = useState([])
  useEffect(() => {
    let a = songsData.filter((song) => song.name.toLowerCase().includes(input) || (song.singer.toLowerCase().includes(input)))
    setnewList(a)
  }, [input])
  return (
    <div className='bg-black flex justify-start items-center flex-col w-[100%] pt-[20px] 
    md:pt-[100px]  h-[100vh] gap-[30px]'>
      <Player />

      <form action="" className='w-[90%] md:max-[70%] h-[60px] flex justify-center items-center gap-5
        bg-gray-800 rounded-lg overflow-hidden p-[15px] md:p-0 ' onSubmit={(e) => {
            e.preventDefault()
        }}   >
        <IoSearch className='text-gray-200 text-[18px]' />
        <input type="text"  className='w-[90%] h-[100%] bg-gray-800 outline-none border-0 p-[10px] text-[18px]
         text-white ' placeholder='Search song...' onChange={(e) => setInput(e.target.value)} value={input} />
      </form>
      <div className='w-[100%] h-[100%] flex-col flex justify-start p-[20px] overflow-auto  items-center gap-5'>
        {newList.map((song) => (
          <Card name={song.name} image={song.image} singer={song.singer} songIndex={song.id-1} /> 
        ))}
      </div>
    </div>
  )
}

export default Search
