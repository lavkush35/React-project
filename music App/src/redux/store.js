import {configureStore} from "@reduxjs/toolkit"
import playlistSlice from "./PlaylistSlice"
import LikedSleice from './LikedSlice'
export const store=configureStore({
    reducer:{
        playlist:playlistSlice,
        liked:LikedSleice
    }
})