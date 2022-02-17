import jwtDecode from 'jwt-decode'
import { useDispatch } from 'react-redux'
import { AuthService } from '../../api/authService'
import { setAuthorized, setUser } from '../../redux/user'
// import styles from './registration.module.scss'

const Registration = () => {

  const dispatch = useDispatch()

  const getUserData = async (e) => {
    e.preventDefault()

    const formData = new FormData(e.target)
    const authData = {
      name: formData.get('name'),
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


  return (<>
    <h2>Registration</h2>
    <form className='form' onSubmit={getUserData}>

      <div>Login</div>
      <input type="text" name='name' />

      <div>Password</div>
      <input type="password" name='password' />

      <div>Роль</div>
      <select name="role">
        <option value={'admin'}>admin</option>
        <option value={'user'}>user</option>
      </select>

      <input type="submit" value='accept' />
    </form >
  </>
  )
}

export default Registration