import { Link } from 'react-router-dom'
import cn from 'classnames'

import { Paths } from '../../routes/links'

import styles from './cart.module.scss'
import mainStyles from '../../pages/main/mainPage.module.scss'

const CartEmpty = () => (
  <div className={styles.cartEmpty}>
    <div className={styles.cartEmpty__background} />
    <div className={styles.cartEmpty__linkWrap}>
      <Link
        className={cn(mainStyles.link, styles.cartEmpty__link)}
        to={Paths.menu}>
        Перейти в меню
      </Link>
    </div>
  </div>
)

export default CartEmpty
