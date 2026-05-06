import React from 'react'

const UserPanelLayout = ({children}) => {
  return (
    <div className='lg:px-32 px-5 my-10'>
      {children}
    </div>
  )
}

export default UserPanelLayout