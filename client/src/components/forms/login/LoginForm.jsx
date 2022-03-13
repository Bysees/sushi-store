import React from 'react'
import { useForm } from 'react-hook-form'
// import { useDispatch } from 'react-redux'
// import jwtDecode from 'jwt-decode'

// import { setAuthorized, setUser } from '../../../redux/user'
// import { AuthService } from '../../../api/authService'
import Validate from '../Validate'

import Modal from '../../common/Modal'
import Input from '../fields/Input'

import styles from '../form.module.scss'


const LoginForm = ({ onHide }) => {

  // const dispatch = useDispatch()
  const serverError = ''

  const onSubmit = async (formData) => {

    // try {
    //   const response = await AuthService.login(authData)
    //   const userData = jwtDecode(response.data.token)
    //   dispatch(setUser({ name: userData.name, role: userData.role }))
    //   dispatch(setAuthorized(true))
    // } catch (e) {

    //   alert(e.response.data.message)
    // }

    console.log(formData)
  }

  const { formState: { errors }, handleSubmit, register } = useForm()


  return (
    <Modal onHide={onHide}>
      <div className={styles.wrapper}>
        <form
          className={styles.form}
          onSubmit={handleSubmit(onSubmit)}
          autoComplete='off'>

          <h2 className={styles.title}>Авторизация</h2>

          <Input
            className={styles.field}
            name='login'
            label='Логин: '
            placeholder='Введите ваш логин...'

            validate={Validate.login()}
            register={register}
            errors={errors}
          />
          <Input
            className={styles.field}
            type='password'
            name='password'
            label='Пароль: '
            placeholder='Введите ваш пароль...'

            validate={Validate.password()}
            errors={errors}
            register={register}
            serverError={serverError}
          />
          <div className={styles.button}>
            <button>Войти</button>
          </div>
        </form>
      </div>
    </Modal>
  )
}

export default LoginForm