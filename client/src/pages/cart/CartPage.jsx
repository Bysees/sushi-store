import React from 'react'

import Cart from '../../components/cart/Cart'
import CartEmpty from '../../components/cart/CartEmpty'
import Container from '../../components/common/Container'

import appStyles from '../../styles/app.module.scss'
import styles from './cartPage.module.scss'


const CartPage = () => {

  const hasItems = true

  return (
    <div className={appStyles.cart}>
      <Container>
        <div className={styles.wrapper}>
          {hasItems
            ? <Cart />
            : <CartEmpty />
          }
        </div>
      </Container >
    </div>
  )
}

export default CartPage