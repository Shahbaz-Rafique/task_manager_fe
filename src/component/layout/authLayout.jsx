import React from 'react'
import Navbar from '../navbar'
import Copyright from '../../component/copyright'

const layout = ({ children }) => {
  return (
    <div>
      <Navbar />
      <div>{children}</div>
      <Copyright />
      <div className='h-20 bg-blue'>
        &nbsp;
      </div>
    </div>
  )
}

export default layout
