import { FC } from 'react'
import { useTypedDispatch } from '../../redux/hooks'

import { ICart } from '../../models/cart'

import { convertAlt } from '../../utils/converter'
import { addToCart, removeFromCart } from '../../redux/slices/cartSlice'

import styles from './cart.module.scss'

const CartItem: FC<ICart> = ({ id, img, title, price, amount }) => {
  const dispatch = useTypedDispatch()

  const increase = () => {
    dispatch(addToCart({ id, img, title, price, amount }))
  }

  const decrease = () => {
    dispatch(removeFromCart({ id, amount: 1 }))
  }

  const remove = () => {
    dispatch(removeFromCart({ id, amount }))
  }

  const totalPrice = price * amount

  return (
    <div className={styles.cartItem}>
      <div className={styles.cartItem__img}>
        <img src={img} alt={convertAlt(img)} />
      </div>
      <div className={styles.cartItem__title}>{title}</div>
      <div className={styles.cartItem__price}>{price}&#8381;</div>
      <div className={styles.amount}>
        <div className={styles.amount__count}>{amount}</div>
        <button className={styles.amount__increase} onClick={increase} />
        <button className={styles.amount__decrease} onClick={decrease} />
      </div>
      <div className={styles.cartItem__totalPrice}>{totalPrice}&#8381;</div>
      <button className={styles.cartItem__remove} onClick={remove} />
    </div>
  )
}
export default CartItem
