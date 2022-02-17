import React, { useState } from 'react'
import Login from '../components/forms/Login'
import Registration from '../components/forms/Registration'
import styles from './authPage.module.scss'

const AuthPage = () => {

  const [hasLogin, setLogin] = useState(true)

  return (
    <div className='auth'>
      <div className='modal'>
        {hasLogin
          ? <button
            className={styles.btn}
            onClick={() => setLogin(false)}>
            Зарегистрироваться
          </button>
          : <button
            className={styles.btn}
            onClick={() => setLogin(true)}>
            Уже есть аккаунт?
          </button>
        }
        {hasLogin
          ? <Login />
          : <Registration />
        }


      </div>
    </div>
  )
}

export default AuthPage
