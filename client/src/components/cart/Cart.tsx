import { FC } from 'react'
import { useSnackbar } from 'notistack'
import { useTypedDispatch } from '../../redux/hooks'

import { ICart } from '../../models/cart'
import CartItem from './CartItem'

import { clearCart } from '../../redux/slices/cartSlice'

import styles from './cart.module.scss'
import productStyles from '../../components/products/products.module.scss'

interface Props {
  cartItems: ICart[]
  totalPrice: number
}

const Cart: FC<Props> = ({ cartItems, totalPrice }) => {
  const dispatch = useTypedDispatch()
  const { enqueueSnackbar } = useSnackbar()

  const checkout = () => {
    const isConfirm = window.confirm('Вы действительно хотите оформить заказ?')

    if (isConfirm) {
      dispatch(clearCart())
      enqueueSnackbar('Заказ оформлен!', { variant: 'success' })
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
      <div className={styles.cart__totalPrice}>Итого: {totalPrice}&#8381;</div>
      <div className={styles.cart__checkout}>
        <button className={productStyles.orderBtn} onClick={checkout}>
          оформить
        </button>
      </div>
    </div>
  )
}

export default Cart
