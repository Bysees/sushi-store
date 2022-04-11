import React from 'react'
import { BrowserRouter, HashRouter } from 'react-router-dom';

const MainRouter = ({ children }) => {

  console.log("process.env.REACT_APP_ENV: ", process.env.REACT_APP_ENV)
  if (process.env.REACT_APP_ENV?.trim() === 'production') {
    console.log("HashRouter")
    return (
      <HashRouter basename={process.env.PUBLIC_URL}>
        {children}
      </HashRouter>
    )
  }

  return (
    <BrowserRouter>
      {children}
    </BrowserRouter>
  )
}

export default MainRouter