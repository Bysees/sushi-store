import { FC } from 'react'
import { BrowserRouter, HashRouter } from 'react-router-dom'

const MainRouter: FC = ({ children }) => {
  if (process.env.NODE_ENV?.trim() === 'production') {
    return <HashRouter basename={process.env.PUBLIC_URL}>{children}</HashRouter>
  }

  return <BrowserRouter>{children}</BrowserRouter>
}

export default MainRouter
