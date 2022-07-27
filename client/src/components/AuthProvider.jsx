import { useDispatch } from 'react-redux'
import { useCheckAuthQuery } from '../redux/RTKquery/auth'
import { setUser } from '../redux/slices/userSlice'
import Spinner from './common/Spinner/Spinner'

const AuthProvider = ({ children }) => {
  const dispatch = useDispatch()
  const { data: user, isSuccess, isLoading, isError, error } = useCheckAuthQuery()

  if (isSuccess) {
    dispatch(setUser(user))
  }

  if (isLoading) {
    return <Spinner />
  }

  if (isError && error.status !== 401) {
    return <h1>{error.message}</h1>
  }

  return children
}

export default AuthProvider