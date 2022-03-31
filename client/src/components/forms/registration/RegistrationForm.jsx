import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'

import Modal from '../../common/Modal'
import Input from '../fields/Input'

import { useRegistrationMutation } from '../../../redux/RTKquery/auth'
import { setUser } from '../../../redux/slices/user'
import Validate from '../Validate'

import styles from '../form.module.scss'

const RegistrationForm = ({ onHide }) => {

  const dispatch = useDispatch()
  const { formState: { errors }, handleSubmit, register, getValues } = useForm()
  const [registration, { isLoading, error: serverError }] = useRegistrationMutation()

  const onSubmit = async (formData) => {

    const response = await registration({
      login: formData.login,
      password: formData.password,
      role: 'user'
    })

    if (!response.error) {
      const user = response.data
      dispatch(setUser(user))
      onHide()
      alert(`Регистрация прошла успешно!\nДобро пожаловать ${user.login}!`)
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
            type='password'
            label='Пароль: '
            placeholder='Придумайте пароль...'

            validate={Validate.password()}
            register={register}
            errors={errors}
          />
          <Input
            className={styles.field}
            name='password_repeat'
            type='password'
            label='Повторите пароль: '
            placeholder='Повторите пароль...'

            validate={Validate.passwordRepeat(getValues)}
            register={register}
            errors={errors}
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

export default RegistrationForm