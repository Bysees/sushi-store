import React from 'react'
import { useDispatch } from 'react-redux'

import CartItem from './CartItem'

import { clearCart } from '../../redux/slices/cart'

import styles from './cart.module.scss'
import productStyles from '../../components/products/products.module.scss'


const Cart = ({ cartItems, totalPrice }) => {

  const dispatch = useDispatch()

  const checkout = () => {
    const isConfirm = window.confirm('Вы действительно хотите оформить заказ?')
    if (isConfirm) {
      dispatch(clearCart())
      window.alert('Поздравляю, мы уже выехали')
    }
  }

  return (
    <div className={styles.cart}>
      <h2 className={styles.cart__headline}>Вы выбрали</h2>
      <div className={styles.cart__items}>
        {cartItems.map((item) => (
          <CartItem key={item.id} {...item} />
        ))}
      </div>
      <div className={styles.cart__totalPrice}>
        Итого: {totalPrice}&#8381;
      </div>
      <div className={styles.cart__checkout}>
        <button
          className={productStyles.orderBtn}
          onClick={checkout}>
          оформить
        </button>
      </div>
    </div>
  )
}

export default Cart