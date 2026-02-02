import React, { useEffect, useState, useRef } from 'react'
import { useContext } from 'react';
import { songsData } from '../songs'
import musicImg from '../assets/musicanim.webp'
import { CgPlayTrackPrev } from "react-icons/cg";
import { IoPlay } from "react-icons/io5";
import { CgPlayTrackNext } from "react-icons/cg";
import { datacontext } from '../context/UserContext';
import { MdOutlinePause } from "react-icons/md";
import Card from '../component/card';
import { MdKeyboardArrowDown } from "react-icons/md";
import Player from '../component/Player';

function Home() {

  let {audioRef, playingSong, playSong, pauseSong, nextSong, index, prevSong} = useContext(datacontext)
  let [range, setRange] = useState(0)
  let progress = useRef(null)
  let [arrow, setArrow] = useState(false)

  useEffect(() => {
    const updateProgress =()=>{
      let duration = audioRef.current.duration || 0
      let currentTime = audioRef.current.currentTime || 0
      let progressPercentage = (currentTime/duration)*100 || 0
      setRange(progressPercentage)
      if(progress.current) {
        progress.current.style.width=`${progressPercentage}%`
      }
    }

    audioRef.current.addEventListener("timeupdate", updateProgress)

  })
  function handleRange(e) {
    let newRange = e.target.value
    setRange(newRange)
    let duration = audioRef.current.duration
    
    audioRef.current.currentTime = (duration*newRange)/100

    
  }
  
  return (
    <div className='w-full h-screen bg-black flex relative overflow-hidden '>
      <MdKeyboardArrowDown className='absolute text-white top-[25px] md:hidden left-[10%] text-[30px] ' onClick={()=>setArrow(prev=>!prev)}/>

      {!arrow?<>
      <div className='w-full md:w-[50%] h-full flex justify-start items-center  pt-[20px] md:pt-[120px] flex-col gap-7 '>
        
        <h1 className='text-white font-semibold text-[20px]'>Now Playing</h1>
        <div className='w-[80%] max:w-[250px] h-[250px] flex justify-center items-center object-fill rounded-md overflow-hidden relative '>
            <img src={songsData[index].image} className='w-[250px] h-[100%]' />
            {playingSong
            ?
            <div className='w-full h-full bg-black absolute top-0 opacity-[0.5] flex justify-center items-center'>
              <img src={musicImg} alt="" className='w-[50%] ' />
            </div>
            : null
            }
        </div>
        <div>
          <div className='text-white text-[30] font-bold text-center'>{songsData[index].name}</div>
          <div className='text-gray-400 text-[18px] text-center '>{songsData[index].singer}</div>
        </div>
        <div className='w-[50%] flex justify-center items-center relative rounded-md'> 
          <input type="range" className='appearance-none w-[100%] h-[7px] rounded-md bg-gray-600' id='range' value={range}  onChange={handleRange}/>
          <div className={`bg-white absolute h-full left-0 rounded-md`} ref={progress}></div>
        </div>
        <div className='text-white flex justify-center items-center gap-5'>
          <CgPlayTrackPrev className='hover:text-gray-600 transition-all cursor-pointer w-[28px] h-[28px]' onClick={()=>prevSong()} />
          {!playingSong? (
          <div className='hover:text-gray-600 transition-all cursor-pointer  w-[50px] h-[50px] rounded-full bg-white text-black flex justify-center items-center' onClick={()=>playSong()}>
            <IoPlay className='w-[20px] h-[20px]'  />
          </div>
          ):(
          <div className='hover:text-gray-600 transition-all cursor-pointer w-[50px] h-[50px] rounded-full bg-white text-black flex justify-center items-center' onClick={() => pauseSong()}>
            <MdOutlinePause className='w-[20px] h-[20px]' />
          </div>
          )}
          <CgPlayTrackNext className='hover:text-gray-600 transition-all cursor-pointer w-[28px] h-[28px]' onClick={() => nextSong()} />
        </div>
        
      </div>
          <div className=' w-[100%] md:w-[50%] h-full  hidden  md:flex flex-col gap-5 overflow-auto pt-[120px] pb-[20px]  '>
            {songsData.map((song)=>(
              <Card key={song.id} name={song.name} image={song.image} singer={song.singer} songIndex={song.id-1} />
            ))}
          </div></>
      :
      <div className=' w-[100%] md:w-[50%] items-center flex flex-col gap-5 overflow-auto
        mt-[70px] relative h-[70%] '>
          <Player/>
        {songsData.map((song)=>(
          <Card key={song.id} name={song.name} image={song.image} singer={song.singer} songIndex={song.id-1} />
        ))}
      </div>}

    </div>
  )
}

export default Home
