import React from 'react'
import appStyles from '../../styles/app.module.scss'

const Container = ({ children }) => {
  return (
    <div className={appStyles.container}>
      {children}
    </div>
  )
}

export default Container