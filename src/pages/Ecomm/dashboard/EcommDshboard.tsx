import React from 'react'
import LeftDashboard from './Component/LeftDashboard'
import RightDashboard from './Component/RightDashboard'
function EcommDshboard() {
  return (
    <div className='flex gap-2 w-full'>
      <div className='w-[60%]'>
      <LeftDashboard/>
      </div>
   <div className='w-[40%]'>
   <RightDashboard/>
   </div>
    </div>
  )
}

export default EcommDshboard
