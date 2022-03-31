import React from 'react'
import { Link } from 'react-router-dom'
import {
  faListAlt, faLock, faShoppingBasket,
  faUnlock, faUser, faUserPlus
} from '@fortawesome/free-solid-svg-icons'
import { useDispatch, useSelector } from 'react-redux'

import LinkIcon from '../../common/LinkIcon'
import Dropdown from '../../common/Dropdown'
import ButtonIcon from '../../common/ButtonIcon'

import { TokenStorage } from '../../../storage/tokenStorage'
import { removeUser } from '../../../redux/slices/user'
import { navbarLinks } from '../../../consts/links'

import styles from './navbar.module.scss'

const Navbar = ({ showLoginForm, showRegistrationForm }) => {

  const dispatch = useDispatch()
  const isLoggedIn = useSelector(state => !!state.user.login)

  const logout = () => {
    TokenStorage.remove()
    dispatch(removeUser())
  }

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
          {navbarLinks.map(({ path, title }) => (
            <Link key={title} to={path}>
              {title}
            </Link>
          ))}
        </div>
      </Dropdown>

      <LinkIcon
        className={styles.link}
        path={'/cart'}
        title={'Корзина '}
        icon={faShoppingBasket}
      />

      {isLoggedIn
        ? <>
          <LinkIcon
            className={styles.link}
            icon={faUser}
            path={'/profile'}
            title={'Профиль'}
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