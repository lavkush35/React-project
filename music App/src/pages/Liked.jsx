import React from 'react'
import Player from '../component/Player'
import { useSelector } from 'react-redux'
import Card from '../component/card'

const Liked = () => {
  let songs=useSelector(state=> state.liked)
  return (
    <div className='w-full h-[100vh] bg-black flex justify-start items-center flex-col pt-[20px] md:pt-[100px]
    gap-[30px]'>
      <Player />
      {!songs.length<1?<><h1 className='text-white font-semibold text-[20px]'>Liked Songs</h1>
      <div className='w-full md:h-[100%] h-[65%] flex flex-col justify-start items-center gap-[20px] overflow-auto  '>
        {songs.map((song)=> (
          <Card name={song.name} image={song.image} singer={song.singer} songIndex={song.songIndex} />
        ))}
      </div></> 
      : 
      <><div className='text-gray-700 text-[30px] font-semibold'>No Liked Songs</div></>
      }
      
    </div>
  )
}

export default Liked
