import { useState } from 'react'
import { useForm } from 'react-hook-form'
import cn from 'classnames'

import Validate from '../Validate'

import Input from '../fields/Input'

import styles from '../form.module.scss'
import profileStyles from './profileForms.module.scss'

const ChangePasswordForm = () => {

  const [serverError, setServerError] = useState('')

  const onSubmit = async (formData) => {
    console.log(formData)
    setServerError(`Server error!!!`)
  }

  const { formState: { errors }, handleSubmit, register, getValues } = useForm({
    defaultValues: {
      login: 'user1234'
    }
  })

  return (
    <form
      className={cn(styles.form, profileStyles.box)}
      onSubmit={handleSubmit(onSubmit)}
      autoComplete='off'>

      <Input
        className={styles.field}
        name='login'
        label='Логин: '
        disabled

        register={register}
      />
      <Input
        className={styles.field}
        name='password'
        label='Новый Пароль: '
        placeholder='Придумайте новый пароль...'

        validate={Validate.password()}
        register={register}
        errors={errors}
      />
      <Input
        className={styles.field}
        name='password_repeat'
        label='Повторите пароль: '
        placeholder='Повторите новый пароль...'

        validate={Validate.passwordRepeat(getValues)}
        register={register}
        errors={errors}
        serverError={serverError}
      />

      <div className={styles.button}>
        <button>Сохранить изменения</button>
      </div>
    </form>
  )
}

export default ChangePasswordForm