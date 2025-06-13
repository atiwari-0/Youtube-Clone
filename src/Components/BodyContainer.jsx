import React from 'react'

const BodyContainer = ({ expanded, height, children }) => {

  return (
    <div className={` ${expanded ? 'sm:ml-40' : 'sm:ml-24'}  ml-0 pl-2`}>
      {children}
    </div>
  )
}

export default BodyContainer