'use client'
import ResponsiveAppBar from '@/app/NavBar'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { MusicTrack } from '../../types';
import axios from 'axios';
import ProfileCard from '../components/profileMusicCard';

const dynamicUserPage: React.FC  = () => {

  const likedTrackIds = useSelector((state: RootState) => state.music.likedTrackIds);
  const savedTrackIds = useSelector((state: RootState) => state.music.savedTrackIds);
  const [allTracks, setAllTracks] = useState<MusicTrack[]>([]);

  useEffect(() => {
    const fetchAllTracks = async () => {
      try {
        const response = await axios.get('/api/cards');
        setAllTracks(response.data);
      } catch (error) {
        console.error('Error fetching all tracks:', error);
      }
    };
    fetchAllTracks();
  }, []);

  const savedTracks = allTracks.filter((track) => {

    return savedTrackIds.includes(track.id); 
  });

 const likedTracks = allTracks.filter((track) => {
  
  return likedTrackIds.includes(track.id); 
});
 

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
              <ProfileCard tracks={likedTracks} />
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
        <ProfileCard tracks={savedTracks}/>
        </div>
        </div>
        </div>
      </div>
    </>
  )
}

export default dynamicUserPage
