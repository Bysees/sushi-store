import jwtDecode from 'jwt-decode'
import React from 'react'
import { useDispatch } from 'react-redux'
import { AuthService } from '../../api/authService'
import { setAuthorized, setUser } from '../../redux/user'
// import styles from './login.module.scss'

const Login = () => {

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


  return (<>
    <h2>Enter</h2>
    <form className='form' onSubmit={getUserData}>

      <div>Login</div>
      <input type="text" name='name' />

      <div>Password</div>
      <input type="password" name='password' />

      <input type="submit" value='accept' />
    </form >
  </>
  )
}

export default Login