import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
// import jwtDecode from 'jwt-decode'

// import { AuthService } from '../../../api/authService'
// import { setAuthorized, setUser } from '../../../redux/user'
import Validate from '../Validate'

import Modal from '../../common/Modal'
import Input from '../fields/Input'

import styles from '../form.module.scss'

const RegistrationForm = ({ onHide }) => {

  // const dispatch = useDispatch()
  const [serverError, setServerError] = useState('')

  const onSubmit = async (formData) => {
    //! Переименовать все name на login, и на сервере тоже.
    // try {
    //   const response = await AuthService.registration(authData)
    //   const userData = jwtDecode(response.data.token)
    //   dispatch(setUser({ name: userData.name, role: userData.role }))
    //   dispatch(setAuthorized(true))
    // } catch (e) {
    //   alert(e.response.data.message)
    // }
    console.log(formData)
    setServerError(`Логин ${formData.login} уже существует`)
  }

  const { formState: { errors }, handleSubmit, register, getValues } = useForm()


  return (
    <Modal onHide={onHide}>
      <div className={styles.wrapper}>
        <form
          className={styles.form}
          onSubmit={handleSubmit(onSubmit)}
          autoComplete='off'>
          <h2 className={styles.title}>Регистрация</h2>

          <Input
            className={styles.field}
            name='login'
            label='Логин: '
            placeholder='Придумайте логин...'

            validate={Validate.login()}
            register={register}
            errors={errors}
          />

          <Input
            className={styles.field}
            name='password'
            label='Пароль: '
            placeholder='Придумайте пароль...'

            validate={Validate.password()}
            register={register}
            errors={errors}
          />
          <Input
            className={styles.field}
            name='password_repeat'
            label='Повторите пароль: '
            placeholder='Повторите пароль...'

            validate={Validate.passwordRepeat(getValues)}
            register={register}
            errors={errors}
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

export default RegistrationForm