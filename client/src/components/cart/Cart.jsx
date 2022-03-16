import React from 'react'

import CartItem from './CartItem'

import styles from './cart.module.scss'
import productStyles from '../../components/products/products.module.scss'

const Cart = () => {

  //! Потом пробежаться по стилям и проверить всё ли ок

  return (
    <div className={styles.cart}>

      <h2 className={styles.cart__headline}>Вы выбрали</h2>

      <div className={styles.cart__items}>
        <CartItem />
        <CartItem />
        <CartItem />
      </div>

      <div className={styles.cart__totalPrice}>
        Итого: 1568&#8381;
      </div>

      <div className={styles.cart__checkout}>
        <button className={productStyles.orderBtn}>оформить</button>
      </div>

    </div>
  )
}

export default Cart