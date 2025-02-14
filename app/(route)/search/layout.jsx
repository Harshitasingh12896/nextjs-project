import React from 'react';
import Search from './components/Search';
const layout = ({children}) => {
  return (
    <div className='grid grid-cols-4'>
        <div>
     {/* Category */}
     <Search/>
        </div>
        <div className='col-span-3'>
            {children}
        </div>
    </div>
  )
}

export default layout;