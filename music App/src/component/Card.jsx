import React, { useContext } from 'react'
import { songsData } from '../songs'
import { MdOutlinePlaylistAdd } from "react-icons/md";
import { IoHeartOutline } from "react-icons/io5";
import { FiHeart } from "react-icons/fi";
import { datacontext } from '../context/UserContext';

const Card = ({name, image, singer, songIndex}) => {
    let {playSong, index, setIndex}=useContext(datacontext)
  return (
    <div className='w-[90%] h-[70px] md:h-[110px] flex justify-center items-center  
    bg-gray-800 rounded-lg p-[10px] md:p-[20px] hover:bg-gray-500 transition-all '>
      <div className='flex justify-start items-center gap-[20px] w-[80%] h-[100%] cursor-pointer' onClick={()=>{
        setIndex(songIndex)
        playSong()
      }}>
        <div>
            <img src={image} alt="" className='md-w-[100px] w-[70px] max-h-[70px] md:max-h-[100px] rounded-lg ' />
        </div>
        <div className='text-[15px] md:text-[20px]'>
            <div className='text-white text-[1.1em] font-semibold'>{name}</div>
            <div className='text-gray-600 text-[0.7em] font-semibold'>{singer}</div>
        </div>
      </div>
      <div className='flex justify-center items-center gap-5 w-[70%] h-[30%] text-[15px] md:text-[20px]'>
        <div>
            <MdOutlinePlaylistAdd className='text-white text-[1.5em] cursor-pointer' />

        </div>
        <div>
            <IoHeartOutline className='text-white text-[1.3em] cursor-pointer' />
        </div>
      </div>
    </div>
  )
}

export default Card
