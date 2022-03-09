import React from 'react'
// import cn from 'classnames'
import styles from './products.module.scss'

const Product = ({ img }) => {
  return (
    <div className={styles.product}>

      <div className={styles.imgWrap}>
        <img
          draggable={false}
          src={img} alt="ebi" />

        <div className={styles.hint_condition}>
          Посмотреть состав
        </div>
        <div className={styles.hint_menu}>
          Найти в меню!
        </div>
      </div>

    </div>
  )
}

export default Product