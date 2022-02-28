import React from 'react'
import Slider from '../components/slider/Slider'

import styles from './mainPage.module.scss'



const MainPage = () => {


  return (
    <div className='main'>
      <div className={styles.wrapper}>
        <Slider />
      </div>
    </div>
  )
}


export default MainPage