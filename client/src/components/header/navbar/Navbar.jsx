import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  faListAlt, faLock, faShoppingBasket,
  faUnlock, faUser, faUserPlus
} from '@fortawesome/free-solid-svg-icons'

import Dropdown from '../../common/Dropdown'

import styles from './navbar.module.scss'
import LinkIcon from '../../common/LinkIcon'
import ButtonIcon from '../../common/ButtonIcon'

const links = [
  { path: 'menu', title: 'Cуши' },
  { path: 'menu', title: 'Ролы' }
]

const Navbar = ({ showLoginForm, showRegistrationForm }) => {

  const [isAuth, setIsAuth] = useState(true)

  const logout = () => setIsAuth(false)

  return (
    <nav className={styles.navbar}>
      <Link to={'/'} className={styles.logo}>
      </Link>

      <Dropdown
        className={styles.dropdown}
        renderButton={() => (
          <ButtonIcon
            className={styles.button}
            icon={faListAlt}
            title={'Меню'}
          />)}>

        <div className={styles.dropdown__list}>
          {links.map(({ path, title }) => (
            <Link key={title} to={path}>
              {title}
            </Link>
          ))}
        </div>
      </Dropdown>

      {isAuth
        ? <>
          <LinkIcon
            className={styles.link}
            icon={faUser}
            path={'/profile'}
            title={'Профиль'}
          />
          <LinkIcon
            className={styles.link}
            path={'/cart'}
            title={'Корзина '}
            icon={faShoppingBasket}
          />
          <ButtonIcon
            className={styles.button}
            onClick={logout}
            title={'Выйти '}
            icon={faUnlock}
          />
        </>
        : <>
          <ButtonIcon
            className={styles.button}
            onClick={showLoginForm}
            title={'Войти '}
            icon={faLock}
          />
          <ButtonIcon
            className={styles.button}
            onClick={showRegistrationForm}
            title={'Зарегистрироваться '}
            icon={faUserPlus}
          />
        </>
      }
    </nav>
  )
}

export default Navbar