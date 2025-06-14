import React from 'react'

const Loader = () => {
  return (
    <div className='flex justify-center items-center h-64'>
        <div className='flex space-x-2'>
            <div className="w-4 h-4 bg-red-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
            <div className="w-4 h-4 bg-red-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
            <div className="w-4 h-4 bg-red-500 rounded-full animate-bounce"></div>
        </div>
    </div>
  )
}

export default Loader