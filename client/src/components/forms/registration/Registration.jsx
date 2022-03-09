import jwtDecode from 'jwt-decode'
import { useDispatch } from 'react-redux'

import Modal from '../../common/Modal'

import { AuthService } from '../../../api/authService'
import { setAuthorized, setUser } from '../../../redux/user'

import styles from './registration.module.scss'

const Registration = ({ onHide }) => {

  const dispatch = useDispatch()

  const getUserData = async (e) => {
    e.preventDefault()
    //! Переименовать все name на login, и на сервере тоже.
    const formData = new FormData(e.target)
    const authData = {
      name: formData.get('login'),
      password: formData.get('password'),
      role: formData.get('role')
    }

    try {
      const response = await AuthService.registration(authData)
      const userData = jwtDecode(response.data.token)
      dispatch(setUser({ name: userData.name, role: userData.role }))
      dispatch(setAuthorized(true))
    } catch (e) {
      alert(e.response.data.message)
    }
  }


  return (<Modal onHide={onHide}>
    <form
      className={styles.form}
      onSubmit={getUserData}
      autoComplete='off'
    >
      <h2 className={styles.title}>Регистрация</h2>

      <div className={styles.login}>
        <label htmlFor="login">Логин: </label>
        <input type="text" name='login' id='login' />
      </div>

      <div className={styles.password}>
        <label htmlFor="password">Пароль: </label>
        <input type="password" name='password' id='password' />
      </div>

      <div className={styles.password}>
        <label htmlFor="password_repeat">Повторите пароль: </label>
        <input type="password" name='password_repeat' id='password_repeat' />
      </div>

      <div className={styles.accept}>
        <button>Войти</button>
      </div>
    </form>
  </Modal>
  )
}

export default Registration