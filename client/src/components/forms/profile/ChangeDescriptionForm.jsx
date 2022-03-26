import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import cn from 'classnames'

import Input from '../fields/Input'
import Textarea from '../fields/Textarea'

import { useUpdateInfoMutation } from '../../../redux/RTKquery/user'
import { setUserInfo } from '../../../redux/user'
import Validate from '../Validate'

import styles from '../form.module.scss'
import profileStyles from './profileForms.module.scss'


const ChangeDescriptionForm = () => {

  const dispatch = useDispatch()
  const { formState: { errors }, handleSubmit, register } = useForm()
  const [updateInfo, { isLoading, error: serverError }] = useUpdateInfoMutation()

  const onSubmit = async (formData) => {

    const response = await updateInfo(formData)
    if (!response.error) {
      const { description, name } = response.data
      dispatch(setUserInfo({ description, name }))
    }
  }

  return (
    <form
      className={cn(styles.form, profileStyles.box)}
      onSubmit={handleSubmit(onSubmit)}
      autoComplete='off'>

      <Input
        className={styles.field}
        name='name'
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
        serverError={serverError?.data?.message}
      />

      <div className={styles.button}>
        <button disabled={isLoading}>Сохранить изменения</button>
      </div>
    </form>
  )
}

export default ChangeDescriptionForm