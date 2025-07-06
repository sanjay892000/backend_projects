import React from 'react'
import dataContext from './dataContext';

function DataState({children}) {
  return (
    <dataContext.Provider>
      {children}
    </dataContext.Provider>
  )
}

export default DataState
