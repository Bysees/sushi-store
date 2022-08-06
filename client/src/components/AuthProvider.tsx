import { FC } from 'react'
import Spinner from './common/Spinner/Spinner'
import { useTypedDispatch } from '../redux/hooks'
import { useCheckAuthQuery } from '../services/api/authApi'
import { setUser } from '../redux/slices/userSlice'

const AuthProvider: FC = ({ children }) => {
  const dispatch = useTypedDispatch()
  const { data: user, isSuccess, isLoading, error } = useCheckAuthQuery()

  if (isSuccess) {
    dispatch(setUser(user))
  }

  if (isLoading) {
    return <Spinner />
  }

  if (error && 'status' in error) {
    if (error.status !== 401) {
      throw new Error(error.data?.message || 'Unexpected auth error')
    }
  }

  return <>{children}</>
}

export default AuthProvider
