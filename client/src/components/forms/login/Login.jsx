import jwtDecode from 'jwt-decode'
import React from 'react'
import { useDispatch } from 'react-redux'
import { AuthService } from '../../../api/authService'
import { setAuthorized, setUser } from '../../../redux/user'
import Modal from '../../common/Modal'
import styles from './login.module.scss'

const Login = ({ onHide }) => {

  const dispatch = useDispatch()

  const getUserData = async (e) => {
    e.preventDefault()

    const formData = new FormData(e.target)
    const authData = {
      name: formData.get('name'),
      password: formData.get('password'),
    }

    try {
      const response = await AuthService.login(authData)
      const userData = jwtDecode(response.data.token)
      dispatch(setUser({ name: userData.name, role: userData.role }))
      dispatch(setAuthorized(true))
    } catch (e) {
      alert(e.response.data.message)
    }
  }


  return (
    <Modal onHide={onHide}>
      <form
        className={styles.form}
        onSubmit={getUserData}
        autoComplete='off'>
        <h2 className={styles.title}>Авторизация</h2>

        <div className={styles.login}>
          <label htmlFor="login">Логин: </label>
          <input type="text" name='login' id='login' />
        </div>

        <div className={styles.password}>
          <label htmlFor="password">Пароль: </label>
          <input type="password" name='password' id='password' />
        </div>

        <div className={styles.accept}>
          <button>Войти</button>
        </div>
      </form >
    </Modal>
  )
}

export default Login