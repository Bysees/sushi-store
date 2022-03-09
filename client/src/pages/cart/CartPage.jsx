import React, { useState } from 'react'
import cn from 'classnames'
import { Link } from 'react-router-dom'

import Container from '../../components/common/Container'

import appStyles from '../../styles/app.module.scss'
import menuStyles from '../../pages/menu/menuPage.module.scss'
import mainStyles from '../../pages/main/mainPage.module.scss'
import styles from './cartPage.module.scss'

import image from '../../images/food/sushi_sake.jpg'

// const sake = {
//   id: "c5e8f345",
//   img: image,
//   price: 420,
//   title: "РОЛЛ С УГРЁМ И АВОКАДО"
// }


const CartPage = () => {

  const hasItems = false

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

const Cart = () => {

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
        <button className={menuStyles.orderBtn}>оформить</button>
      </div>

    </div>
  )
}

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
        ></button>
        <button
          className={styles.quantity__decrease}
          onClick={decrease}
        ></button>
      </div>
      <div className={styles.item__amount}>980&#8381;</div>
      <button className={styles.item__remove}></button>

    </div>
  )
}

const CartEmpty = () => {

  return (
    <div className={styles.cartEmpty}>
      <div className={styles.cartEmpty__background}></div>

      <div className={styles.cartEmpty__linkWrap}>
        <Link
          className={cn(mainStyles.link, styles.cartEmpty__link)}
          to='/menu'>
          Перейти в меню
        </Link>
      </div>

    </div>
  )
}

export default CartPage