'use client'
import MusicCard from '@/app/Card'
import ResponsiveAppBar from '@/app/NavBar'
import React from 'react'
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { MusicTrack } from '../../types';

const dynamicUserPage: React.FC  = () => {

  const likedTracks: MusicTrack[] = useSelector((state: RootState) => state.music.likedTracks);
  const savedTracks: MusicTrack[] = useSelector((state: RootState) => state.music.savedTracks);
  
  return (
    <>
      <ResponsiveAppBar/>
      <div className='flex w-full h-auto'>
        <div className='w-1/2 h-auto pt-5'>
        <h5 className='text-center font-bold text-3xl mb-5'>
            Liked
        </h5>
        <div className='w-full h-auto p-5 border-r-2 border-gray-200 pt-0'>
        {/* create the cards div */}
        <div className='w-full h-auto border-2 border-gray-300 rounded-xl flex flex-wrap gap-3 justify-center p-3 bg-slate-100'>
        {likedTracks.length > 0 ? (
                likedTracks.map((track: MusicTrack) => <MusicCard key={track.id} track={track} />)
              ) : (
                <p>No liked tracks.</p>
              )}
        </div>
        </div>
        </div>
        {/* right side */}
        <div className='w-1/2 h-auto pt-5'>
        <h5 className='text-center font-bold text-3xl mb-5'>
            Saved
        </h5>
        <div className='w-full h-auto p-5 pt-0'>
        {/* create the cards div */}
        <div className='w-full h-auto border-2 border-gray-300 rounded-xl flex flex-wrap gap-3 justify-center p-3 bg-slate-100'>
        {savedTracks.length > 0 ? (
                savedTracks.map((track: MusicTrack) => <MusicCard key={track.id} track={track} />)
              ) : (
                <p>No saved tracks.</p>
              )}
        </div>
        </div>
        </div>
      </div>
    </>
  )
}

export default dynamicUserPage
