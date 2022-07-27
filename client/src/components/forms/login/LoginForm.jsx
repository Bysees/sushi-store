import React from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'

import Modal from '../../common/Modal'
import Input from '../fields/Input'

import Validate from '../Validate'
import { useLoginMutation } from '../../../redux/RTKquery/auth'
import { setUser } from '../../../redux/slices/userSlice'

import styles from '../form.module.scss'

const LoginForm = ({ onHide }) => {

  const dispatch = useDispatch()
  const { formState: { errors }, handleSubmit, register } = useForm({
    defaultValues: {
      login: 'admin',
      password: 'qwerty12'
    }
  })

  const [login, { isLoading, error: serverError }] = useLoginMutation()

  const onSubmit = async (formData) => {

    const response = await login({
      login: formData.login,
      password: formData.password
    })

    if (!response.error) {
      const user = response.data
      dispatch(setUser(user))
      onHide()
      alert(`Добро пожаловать ${user.login}`)
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
            name='login'
            label='Логин: '
            placeholder='Введите ваш логин...'

            validate={Validate.required()}
            register={register}
            errors={errors}
          />

          <Input
            className={styles.field}
            type='password'
            name='password'
            label='Пароль: '
            placeholder='Введите ваш пароль...'

            validate={Validate.required()}
            errors={errors}
            register={register}
            serverError={serverError?.data?.message}
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