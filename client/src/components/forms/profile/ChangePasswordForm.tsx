import { FC } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useSnackbar } from 'notistack'
import cn from 'classnames'

import Input from '../fields/Input'
import PasswordInput from '../fields/PasswordInput'

import { Validate } from '../helper/validate'
import {
  isErrorWithMessage,
  isFetchErrorResponse
} from '../../../services/api/helper'
import { useChangePasswordMutation } from '../../../services/api/authApi'

import styles from '../form.module.scss'
import profileStyles from './profileForms.module.scss'

interface FormValues {
  login: string
  password: string
  passwordRepeat: string
}

interface Props {
  login: string
  role: string
}

const ChangePasswordForm: FC<Props> = ({ login, role }) => {
  const { enqueueSnackbar } = useSnackbar()

  const {
    formState: { errors },
    handleSubmit,
    register,
    getValues,
    resetField,
    setError,
    clearErrors
  } = useForm<FormValues>({
    defaultValues: {
      login
    }
  })

  const [changePassword, { isLoading }] = useChangePasswordMutation()
  const clearServerError = () => clearErrors('passwordRepeat')

  const onSubmit: SubmitHandler<FormValues> = async (formData) => {
    try {
      await changePassword({
        login: formData.login,
        password: formData.password,
        role
      }).unwrap()

      resetField('password')
      resetField('passwordRepeat')
      const successMessage = 'Пароль был успешно изменён'
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
    <form
      className={cn(styles.form, profileStyles.box)}
      onSubmit={handleSubmit(onSubmit)}
      autoComplete='off'>
      <Input
        className={styles.field}
        label='Логин: '
        disabled
        register={register('login')}
      />

      <PasswordInput
        className={styles.field}
        label='Новый Пароль: '
        placeholder='Придумайте новый пароль...'
        register={register('password', Validate.password())}
        error={errors.password}
        onFocus={clearServerError}
      />

      <PasswordInput
        className={styles.field}
        label='Повторите пароль: '
        placeholder='Повторите новый пароль...'
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
        <button disabled={isLoading}>Сохранить изменения</button>
      </div>
    </form>
  )
}

export default ChangePasswordForm
