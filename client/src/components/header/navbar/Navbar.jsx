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
import { appRoutes } from '../../../consts/links'
import { useGetCategoriesQuery } from '../../../redux/RTKquery/category'

import styles from './navbar.module.scss'


const Navbar = ({ showLoginForm, showRegistrationForm }) => {

  const dispatch = useDispatch()
  const isLoggedIn = useSelector(state => !!state.user.login)

  const { data, isLoading } = useGetCategoriesQuery()
  const categories = data?.categories

  const logout = () => {
    TokenStorage.remove()
    dispatch(removeUser())
  }

  return (
    <nav className={styles.navbar}>
      <Link to={appRoutes.main} className={styles.logo} />

      <Dropdown
        className={styles.dropdown}
        renderButton={() => (
          <ButtonIcon
            className={styles.button}
            icon={faListAlt}
            title={'Меню'}
          />)}>

        <div className={styles.dropdown__list}>
          {!isLoading && categories.map((category) => (
            <Link
              key={category.eng}
              to={`${appRoutes.menu}/${category.eng}`}>
              {category.rus}
            </Link>
          ))}
        </div>
      </Dropdown>

      <LinkIcon
        className={styles.link}
        path={appRoutes.cart}
        title={'Корзина '}
        icon={faShoppingBasket}
      />

      {isLoggedIn
        ? <>
          <LinkIcon
            className={styles.link}
            icon={faUser}
            path={appRoutes.profile}
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