import React, { useState } from 'react'
import img from '../../images/food/sushi_sake.jpg'
// import cn from 'classnames'
import { CSSTransition } from 'react-transition-group'

import styles from './test.module.scss'
import './test.css'
const Test = () => {


  const [isShowImg, showImg] = useState(true)



  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>

        <CSSTransition
          in={isShowImg}
          timeout={300}
          classNames={{
            // enter: styles["img-enter"],
            // enterActive: styles["img-enter-active"],
            // exitActive: styles["img-exit-active"],
          }}
          unmountOnExit
          mountOnEnter
        >
          <img className={styles.img} src={img} alt="sake" />
        </CSSTransition>


        <button onClick={() => showImg(false)}>HIDE</button>
        <button onClick={() => showImg(true)}>SHOW</button>

      </div>
    </div>
  )
}

export default Test