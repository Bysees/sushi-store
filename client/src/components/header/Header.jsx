import React, { Fragment, useEffect, useRef, useState } from 'react'
import cn from 'classnames'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faListAlt, faLock, faShoppingBasket, faUnlock, faUser, faUserPlus } from '@fortawesome/free-solid-svg-icons'

import Container from '../common/Container'
import Login from '../forms/login/Login'
import Registration from '../forms/registration/Registration'

import styles from './header.module.scss'
import appStyles from '../../styles/app.module.scss'

const Header = () => {

  const [isAuth, setIsAuth] = useState(true)

  const [isShowLoginForm, setIsShowLoginForm] = useState(false)
  const showLoginForm = () => setIsShowLoginForm(true)
  const hideLoginForm = () => setIsShowLoginForm(false)

  const [isShowRegistrationForm, setIsShowRegistrationForm] = useState(false)
  const showRegistrationForm = () => setIsShowRegistrationForm(true)
  const hideRegistrationForm = () => setIsShowRegistrationForm(false)

  const menuRef = useRef(null)
  const [isShowMenu, setIsShowMenu] = useState(false)

  useEffect(() => {

    const toogleShowingMenu = (e) => {
      const path = e.composedPath()
      const isClickOnMenu = path.includes(menuRef.current)

      if (isClickOnMenu) {
        setIsShowMenu(isShow => !isShow)
      } else {
        setIsShowMenu(false)
      }
    }

    document.addEventListener('click', toogleShowingMenu)
    return () => {
      document.removeEventListener('click', toogleShowingMenu)
    }
  }, [])


  const logout = () => setIsAuth(false)

  return (
    <header className={appStyles.header}>

      {isShowLoginForm && <Login onHide={hideLoginForm} />}
      {isShowRegistrationForm && <Registration onHide={hideRegistrationForm} />}

      <Container>

        <nav className={styles.navbar}>
          <Link to={'/'} className={styles.logo}>
          </Link>

          <div className={styles.menu} ref={menuRef}>
            <button className={styles.menu__button}>
              <FontAwesomeIcon className={styles.menu__icon} icon={faListAlt} />
              <div className={styles.menu__title}>Меню</div>
              <span className={cn(styles.menu__arrow, isShowMenu && styles.menu__arrow_right)}></span>

              {isShowMenu &&
                <div className={styles.menu__items}>
                  <Link className={styles.menu__items_link} to={'menu'}>
                    Суши
                  </Link>
                  <Link className={styles.menu__items_link} to={'menu'}>
                    Ролы
                  </Link>
                </div>}

            </button>

          </div>

          {isAuth
            ? <Fragment>
              <div className={styles.profile}>
                <Link to={'/profile'} className={styles.profile__link}>
                  <FontAwesomeIcon className={styles.profile__icon} icon={faUser} />
                  <div className={styles.profile__title}>Профиль</div>
                </Link>
              </div>

              <div className={styles.cart}>
                <Link to={'/cart'} className={styles.cart__link}>
                  <FontAwesomeIcon className={styles.cart__icon} icon={faShoppingBasket} />
                  <div className={styles.cart__title}>Корзина</div>
                </Link>
              </div>

              <div className={styles.logout}>
                <button className={styles.logout__button} onClick={logout}>
                  <FontAwesomeIcon className={styles.logout__icon} icon={faUnlock} />
                  <div className={styles.logout__title}>Выйти</div>
                </button>
              </div>
            </Fragment>

            : <Fragment>
              <div className={styles.login}>
                <button className={styles.login__button} onClick={showLoginForm}>
                  <FontAwesomeIcon className={styles.login__icon} icon={faLock} />
                  <div className={styles.login__title}>Войти</div>
                </button>
              </div>

              <div className={styles.signUp}>
                <button className={styles.signUp__button} onClick={showRegistrationForm}>
                  <FontAwesomeIcon className={styles.signUp__icon} icon={faUserPlus} />
                  <div className={styles.signUp__title}>Зарегистрироваться</div>
                </button>
              </div>
            </Fragment>
          }
        </nav>

      </Container>

    </header >
  )
}

export default Header