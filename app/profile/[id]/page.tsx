import MusicCard from '@/app/Card'
import ResponsiveAppBar from '@/app/NavBar'
import React from 'react'

const dynamicUserPage = () => {
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
            <MusicCard/>
            <MusicCard/>
            <MusicCard/>
            <MusicCard/>
            <MusicCard/>
            <MusicCard/>
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
            <MusicCard/>
            <MusicCard/>
            <MusicCard/>
            <MusicCard/>
            <MusicCard/>
            <MusicCard/>
        </div>
        </div>
        </div>
      </div>
    </>
  )
}

export default dynamicUserPage
