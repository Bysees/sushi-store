import { FC } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { useSnackbar } from 'notistack'

import { ICategory } from '../../../models/product'

import Modal from '../../common/Modal'
import Input from '../fields/Input'

import { Validate } from '../helper/validate'
import { useCreateCategoryMutation } from '../../../services/api/categoryApi'
import {
  isErrorWithMessage,
  isFetchErrorResponse
} from '../../../services/api/helper'

import styles from '../form.module.scss'

interface Props {
  onHide: () => void
}

const CreateCategoryForm: FC<Props> = ({ onHide }) => {
  const { enqueueSnackbar } = useSnackbar()
  const navigate = useNavigate()
  const {
    formState: { errors },
    handleSubmit,
    register,
    reset,
    setError,
    clearErrors
  } = useForm<ICategory>()

  const [createCategory, { isLoading }] = useCreateCategoryMutation()
  const clearServerError = () => clearErrors('rus')

  const onSubmit: SubmitHandler<ICategory> = async (categoryData) => {
    try {
      await createCategory(categoryData).unwrap()
      const newCategoryLink = categoryData.eng
      navigate(newCategoryLink)
      reset()
      const successMessage = `Категория "${categoryData.rus}" успешно добавлена!`
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
        return setError('rus', {
          type: 'server',
          message: errMessage
        })
      }
      throw err
    }
  }

  return (
    <Modal>
      <div className={styles.wrapper}>
        <form
          className={styles.form}
          onSubmit={handleSubmit(onSubmit)}
          autoComplete='off'>
          <button type='button' className={styles.exit} onClick={onHide}>
            <span>&times;</span>
          </button>

          <h2 className={styles.title}>Добавить категорию</h2>

          <Input
            className={styles.field}
            label={'На английском: '}
            placeholder={'pizza'}
            register={register('eng', Validate.categoryEng())}
            error={errors.eng}
            onFocus={clearServerError}
          />

          <Input
            className={styles.field}
            label={'На русском: '}
            placeholder={'пицца'}
            register={register('rus', Validate.categoryRus())}
            error={errors.rus}
            onFocus={clearServerError}
          />

          <div className={styles.button}>
            <button disabled={isLoading}>Подтвердить</button>
          </div>
        </form>
      </div>
    </Modal>
  )
}

export default CreateCategoryForm
