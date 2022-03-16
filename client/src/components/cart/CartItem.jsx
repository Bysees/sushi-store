import React, { useState } from 'react'
import cn from 'classnames'
import image from '../../images/food/sushi_sake.jpg'

import styles from './cart.module.scss'

const CartItem = () => {

  const [count, setCount] = useState(0)
  const increase = () => setCount(count => count + 1)
  const decrease = () => setCount(count => count - 1)

  return (
    <div className={cn(styles.cart__item, styles.item)}>

      <div className={styles.item__img}>
        <img src={image} alt="sake" />
      </div>
      <div className={styles.item__title}>Суши унаги</div>
      <div className={styles.item__price}>490&#8381;</div>
      <div className={cn(styles.item__quantity, styles.quantity)}>
        <div className={styles.quantity__count}>{count}</div>
        <button
          className={styles.quantity__increase}
          onClick={increase}
        />
        <button
          className={styles.quantity__decrease}
          onClick={decrease}
        />
      </div>
      <div className={styles.item__amount}>980&#8381;</div>
      <button className={styles.item__remove} />

    </div>
  )
}
export default CartItem