import ResponsiveAppBar from '@/app/NavBar'
import React from 'react'

const dynamicUserPage = () => {
  return (
    <>
      <ResponsiveAppBar/>
      <div className='flex w-full h-96'>
        <div className='w-1/2 bg-green-500 h-full border-r-2 border-black pt-3'>
        <h5 className='text-center font-bold text-3xl'>
            Liked:
        </h5>
        <div className='flex'>
        {/* create the cards div */}
        </div>
        </div>
        <div className='w-1/2 bg-red-500 h-full'>
        <h5 className='text-center font-bold text-3xl pt-3'>
            Saved:
        </h5>
        </div>
      </div>
    </>
  )
}

export default dynamicUserPage
