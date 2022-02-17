import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setAuthorized } from '../redux/user'
import { TokenService } from '../storage/tokenService'
import styles from './homePage.module.scss'

const HomePage = () => {

  const dispatch = useDispatch()

  const { name, role } = useSelector(state => state.user)
  const admin = (role === 'admin')

  const logout = () => {
    TokenService.remove()
    dispatch(setAuthorized(false))
  }

  return (
    <div className='home'>
      <div className={styles.absolute}>

        <div className={styles.user}>Этот блок виден <span>обычному юзеру</span></div>

        {admin &&
          <div className={styles.admin}>Этот блок виден <span>Администратору!</span></div>
        }

      </div>
      <div className={styles.title}>
        <h1>Welcome to home {name}</h1>
        <button
          className={styles.logout}
          onClick={logout}
        >
          Logout
        </button>
      </div>

    </div>
  )
}

export default HomePage
