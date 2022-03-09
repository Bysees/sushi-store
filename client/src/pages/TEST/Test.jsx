import React, { useState } from 'react'
import styles from './test.module.scss'
import img from '../../images/food/sushi_sake.jpg'
import cn from 'classnames'

const Test = () => {

  const [isShowDescription, showDescription] = useState(false)
  const [isShowImg, showImg] = useState(false)

  console.log('isShowDescription: ', isShowDescription)
  console.log('isShowImg: ', isShowImg)

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>

        <div className={cn(
          styles.imgWrap,
          isShowDescription && styles.imgWrap_showDescription,
          isShowImg && styles.imgWrap_showImg,
        )}
        >

          <img className={styles.img} src={img} alt="sake"
          />

          <div className={styles.description}>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Laborum sint quaerat totam numquam, tempore praesentium a neque ipsa excepturi fugit, fugiat dolorum possimus reprehenderit aspernatur quo doloribus assumenda! Ad, cumque.
          </div>

        </div>

        <button onClick={() => {
          showDescription(true)
          showImg(false)
        }}>
          show info
        </button>
        <button onClick={() => {
          showDescription(false)
          showImg(true)
        }}>
          show img
        </button>

      </div>
    </div>
  )
}

export default Test