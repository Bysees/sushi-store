import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import cn from 'classnames'

import Input from '../fields/Input'
import Textarea from '../fields/Textarea'

import { useUpdateInfoMutation } from '../../../redux/RTKquery/user'
import { setUserInfo } from '../../../redux/slices/user'
import Validate from '../Validate'

import styles from '../form.module.scss'
import profileStyles from './profileForms.module.scss'


const ChangeDescriptionForm = () => {

  const dispatch = useDispatch()
  const { formState: { errors }, handleSubmit, register, reset } = useForm()
  const [updateInfo, { isLoading, error: serverError }] = useUpdateInfoMutation()

  const { currentDescription, currentName } = useSelector(state => ({
    currentDescription: state.user.description,
    currentName: state.user.name,
  }))

  const onSubmit = async (formData) => {
    if (!formData.name && !formData.description) {
      return
    }
    if (formData.name === currentName && formData.description === currentDescription) {
      return
    }

    formData.name = formData.name || currentName
    formData.description = formData.description || currentDescription

    const response = await updateInfo(formData)
    if (!response.error) {
      reset()
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