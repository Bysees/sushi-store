import { FC } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useTypedDispatch } from '../../../redux/hooks'
import { useSnackbar } from 'notistack'
import cn from 'classnames'

import Input from '../fields/Input'
import Textarea from '../fields/Textarea'

import { Validate } from '../helper/validate'
import { setUserInfo } from '../../../redux/slices/userSlice'
import {
  isErrorWithMessage,
  isFetchErrorResponse
} from '../../../services/api/helper'
import { useUpdateInfoMutation } from '../../../services/api/userApi'

import styles from '../form.module.scss'
import profileStyles from './profileForms.module.scss'

interface FormValues {
  name: string
  description: string
}

interface Props {
  name: string | null
  description: string | null
}

const ChangeDescriptionForm: FC<Props> = ({
  name: currentName,
  description: currentDescription
}) => {
  const dispatch = useTypedDispatch()
  const { enqueueSnackbar } = useSnackbar()

  const {
    formState: { errors },
    handleSubmit,
    register,
    reset,
    setError,
    clearErrors
  } = useForm<FormValues>()

  const [updateInfo, { isLoading }] = useUpdateInfoMutation()
  const clearServerError = () => clearErrors('description')

  const onSubmit: SubmitHandler<FormValues> = async (formData) => {
    const { description, name } = formData

    if (!name && !description) {
      return
    }
    if (name === currentName && description === currentDescription) {
      return
    }

    const updateData = {
      name: name || currentName,
      description: description || currentDescription
    }

    try {
      const updatedData = await updateInfo(updateData).unwrap()
      reset()
      dispatch(setUserInfo(updatedData))
      const successMessage = 'Данные успешно изменены'
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
        return setError('description', {
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
        label='Ваше имя: '
        placeholder='Введите ваше имя...'
        register={register('name', Validate.username())}
        onFocus={clearServerError}
        error={errors.name}
      />

      <Textarea
        className={styles.field}
        label='О себе: '
        placeholder='Расскажите кто вы, где живёте, чем занимаетесь...'
        register={register('description', Validate.description())}
        onFocus={clearServerError}
        error={errors.description}
      />

      <div className={styles.button}>
        <button disabled={isLoading}>Сохранить изменения</button>
      </div>
    </form>
  )
}

export default ChangeDescriptionForm
