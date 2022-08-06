import { FC } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useTypedDispatch } from '../../../redux/hooks'
import { useSnackbar } from 'notistack'

import Modal from '../../common/Modal'
import Input from '../fields/Input'

import { Validate } from '../helper/validate'
import { useLoginMutation } from '../../../services/api/authApi'
import {
  isErrorWithMessage,
  isFetchErrorResponse
} from '../../../services/api/helper'
import { setUser } from '../../../redux/slices/userSlice'

import styles from '../form.module.scss'

type FormValues = {
  login: string
  password: string
}

interface Props {
  onHide: () => void
}

const LoginForm: FC<Props> = ({ onHide }) => {
  const dispatch = useTypedDispatch()
  const { enqueueSnackbar } = useSnackbar()
  const {
    formState: { errors },
    handleSubmit,
    register,
    setError,
    clearErrors
  } = useForm<FormValues>({
    defaultValues: {
      login: 'admin',
      password: 'qwerty12'
    }
  })

  const [login, { isLoading }] = useLoginMutation()
  const clearServerError = () => clearErrors('password')

  const onSubmit: SubmitHandler<FormValues> = async (authData) => {
    try {
      const user = await login({
        login: authData.login,
        password: authData.password
      }).unwrap()

      dispatch(setUser(user))
      onHide()
      const successMessage = `Добро пожаловать ${user.login}`
      enqueueSnackbar(successMessage, { variant: 'success' })
    } catch (err) {
      let errMessage: string | undefined
      if (isFetchErrorResponse(err)) {
        errMessage = err.data?.message
      }
      if (isErrorWithMessage(err)) {
        errMessage = err.message
      }
      if (errMessage) {
        return setError('password', {
          type: 'server',
          message: errMessage
        })
      }
      throw err
    }
  }

  return (
    <Modal>
      <div className={styles.wrapper}>
        <form
          className={styles.form}
          onSubmit={handleSubmit(onSubmit)}
          autoComplete='off'>
          <button className={styles.exit} type='button' onClick={onHide}>
            <span>&times;</span>
          </button>

          <h2 className={styles.title}>Авторизация</h2>

          <Input
            className={styles.field}
            label='Логин: '
            placeholder='Введите ваш логин...'
            register={register('login', Validate.required())}
            error={errors.login}
            onFocus={clearServerError}
          />

          <Input
            className={styles.field}
            label='Пароль: '
            type='password'
            placeholder='Придумайте пароль...'
            register={register('password', Validate.required())}
            error={errors.password}
            onFocus={clearServerError}
          />

          <div className={styles.button}>
            <button disabled={isLoading}>Войти</button>
          </div>
        </form>
      </div>
    </Modal>
  )
}

export default LoginForm
