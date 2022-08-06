import { Link } from 'react-router-dom'
import {
  faListAlt,
  faLock,
  faShoppingBasket,
  faUnlock,
  faUser,
  faUserPlus
} from '@fortawesome/free-solid-svg-icons'
import { useTypedDispatch, useTypedSelector } from '../../../redux/hooks'

import LinkIcon from '../../common/LinkIcon'
import Dropdown from '../../common/Dropdown'
import ButtonIcon from '../../common/ButtonIcon'
import LoginForm from '../../forms/login/LoginForm'
import RegistrationForm from '../../forms/registration/RegistrationForm'

import { useGetCategoriesQuery } from '../../../services/api/categoryApi'
import { TokenStorage } from '../../../services/storage/tokenStorage'
import { removeUser } from '../../../redux/slices/userSlice'
import { useToogle } from '../../../hooks/useToogle'
import { Paths } from '../../../routes/links'

import styles from './navbar.module.scss'

const Navbar = () => {
  const dispatch = useTypedDispatch()
  const isLoggedIn = useTypedSelector((state) => !!state.user.login)

  const { data: categories = [], isLoading } = useGetCategoriesQuery()

  const logout = () => {
    TokenStorage.remove()
    dispatch(removeUser())
  }

  const [isLoginForm, showLoginForm, hideLoginForm] = useToogle(false)
  const [isRegistrationForm, showRegistrationForm, hideRegistrationForm] =
    useToogle(false)

  return (
    <>
      <nav className={styles.navbar}>
        <Link to={Paths.main} className={styles.logo} />

        <Dropdown
          className={styles.dropdown}
          renderButton={() => (
            <ButtonIcon
              className={styles.button}
              icon={faListAlt}
              title={'Меню'}
            />
          )}
          renderList={() =>
            !isLoading &&
            categories.map((category) => (
              <Link
                className={styles.dropdown__link}
                key={category.eng}
                to={`${Paths.menu}/${category.eng}`}>
                {category.rus}
              </Link>
            ))
          }
        />

        <LinkIcon
          className={styles.link}
          path={Paths.cart}
          title={'Корзина '}
          icon={faShoppingBasket}
        />

        {isLoggedIn ? (
          <>
            <LinkIcon
              className={styles.link}
              icon={faUser}
              path={Paths.profile}
              title={'Профиль'}
            />
            <ButtonIcon
              className={styles.button}
              onClick={logout}
              title={'Выйти '}
              icon={faUnlock}
            />
          </>
        ) : (
          <>
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
        )}
      </nav>
      {isLoginForm && <LoginForm onHide={hideLoginForm} />}
      {isRegistrationForm && <RegistrationForm onHide={hideRegistrationForm} />}
    </>
  )
}

export default Navbar
