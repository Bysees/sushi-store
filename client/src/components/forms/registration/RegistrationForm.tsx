import { FC } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useTypedDispatch } from '../../../redux/hooks'
import { useSnackbar } from 'notistack'

import Modal from '../../common/Modal'
import Input from '../fields/Input'
import PasswordInput from '../fields/PasswordInput'

import { useRegistrationMutation } from '../../../services/api/authApi'
import {
  isErrorWithMessage,
  isFetchErrorResponse
} from '../../../services/api/helper'
import { setUser } from '../../../redux/slices/userSlice'
import { Validate } from '../helper/validate'

import styles from '../form.module.scss'

type FormValues = {
  login: string
  password: string
  passwordRepeat: string
}

interface Props {
  onHide: () => void
}

const RegistrationForm: FC<Props> = ({ onHide }) => {
  const dispatch = useTypedDispatch()
  const { enqueueSnackbar } = useSnackbar()
  const {
    formState: { errors },
    handleSubmit,
    register,
    getValues,
    setError,
    clearErrors
  } = useForm<FormValues>()

  const [registration, { isLoading }] = useRegistrationMutation()
  const clearServerError = () => clearErrors('passwordRepeat')

  const onSubmit: SubmitHandler<FormValues> = async (authData) => {
    try {
      const user = await registration({
        login: authData.login,
        password: authData.password,
        role: 'user'
      }).unwrap()

      dispatch(setUser(user))
      onHide()
      const successMessage = `Регистрация прошла успешно! Добро пожаловать ${user.login}!`
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
        return setError('passwordRepeat', {
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
          <h2 className={styles.title}>Регистрация</h2>

          <button className={styles.exit} type='button' onClick={onHide}>
            <span>&times;</span>
          </button>

          <Input
            className={styles.field}
            label='Логин: '
            placeholder='Придумайте логин...'
            register={register('login', Validate.login())}
            error={errors.login}
            onFocus={clearServerError}
          />

          <PasswordInput
            className={styles.field}
            label='Пароль: '
            placeholder='Придумайте пароль...'
            register={register('password', Validate.password())}
            error={errors.password}
            onFocus={clearServerError}
          />

          <PasswordInput
            className={styles.field}
            label='Повторите пароль: '
            placeholder='Повторите пароль...'
            register={register(
              'passwordRepeat',
              Validate.passwordRepeat({
                comparedValue: getValues('password')
              })
            )}
            error={errors.passwordRepeat}
            onFocus={clearServerError}
          />

          <div className={styles.button}>
            <button disabled={isLoading}>Подтвердить</button>
          </div>
        </form>
      </div>
    </Modal>
  )
}

export default RegistrationForm
