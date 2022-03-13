import { useState } from 'react'
import { useForm } from 'react-hook-form'
import cn from 'classnames'

import Validate from '../Validate'

import Input from '../fields/Input'
import Textarea from '../fields/Textarea'

import styles from '../form.module.scss'
import profileStyles from './profileForms.module.scss'

const ChangeDescriptionForm = () => {

  const [serverError, setServerError] = useState('')

  const onSubmit = async (formData) => {
    console.log(formData)
    setServerError(`Server Error!!!`)
  }

  const { formState: { errors }, handleSubmit, register } = useForm()

  return (
    <form
      className={cn(styles.form, profileStyles.box)}
      onSubmit={handleSubmit(onSubmit)}
      autoComplete='off'>

      <Input
        className={styles.field}
        name='username'
        label='Ваше имя: '
        placeholder='Введите ваше имя...'

        validate={Validate.username()}
        register={register}
        errors={errors}
      />
      <Textarea
        className={styles.field}
        name='description'
        label='О себе: '
        placeholder='Расскажите кто вы, где живёте, чем занимаетесь...'

        validate={Validate.description()}
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

export default ChangeDescriptionForm