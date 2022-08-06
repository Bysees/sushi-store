import { useTypedSelector } from '../../redux/hooks'

import Cart from '../../components/cart/Cart'
import CartEmpty from '../../components/cart/CartEmpty'
import Container from '../../components/common/Container'

import appStyles from '../../styles/app.module.scss'
import styles from './cartPage.module.scss'

const CartPage = () => {
  const { cartItems, totalPrice } = useTypedSelector((state) => ({
    cartItems: state.cart.cartItems,
    totalPrice: state.cart.totalPrice
  }))

  return (
    <div className={appStyles.cart}>
      <Container>
        <div className={styles.wrapper}>
          {cartItems.length > 0 ? (
            <Cart totalPrice={totalPrice} cartItems={cartItems} />
          ) : (
            <CartEmpty />
          )}
        </div>
      </Container>
    </div>
  )
}

export default CartPage
