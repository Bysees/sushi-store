import { FC } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { useSnackbar } from 'notistack'

import { ICategory } from '../../../models/product'

import Modal from '../../common/Modal'
import Input from '../fields/Input'

import { Validate } from '../helper/validate'
import { useUpdateCategoryMutation } from '../../../services/api/categoryApi'
import {
  isErrorWithMessage,
  isFetchErrorResponse
} from '../../../services/api/helper'

import styles from '../form.module.scss'

interface Props {
  onHide: () => void
  currentCategory: string
  categories: ICategory[]
}

const UpdateCategoryForm: FC<Props> = ({
  onHide,
  currentCategory,
  categories
}) => {
  const currentCategoryValues = categories.find(
    (category) => category.eng === currentCategory
  )

  const { enqueueSnackbar } = useSnackbar()
  const navigate = useNavigate()
  const {
    formState: { errors },
    handleSubmit,
    register,
    setError,
    clearErrors
  } = useForm<ICategory>({
    shouldFocusError: false,
    defaultValues: {
      eng: currentCategoryValues?.eng,
      rus: currentCategoryValues?.rus
    }
  })

  const [updateCategory, { isLoading }] = useUpdateCategoryMutation()
  const clearServerError = () => clearErrors('rus')

  const onSubmit: SubmitHandler<ICategory> = async (categoryData) => {
    try {
      await updateCategory({
        category: currentCategory,
        body: categoryData
      }).unwrap()

      const newCategoryLink = categoryData.eng
      navigate(newCategoryLink)
      const successMessage = `Категория "${currentCategory}" изменна на "${categoryData.rus}"!`
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

          <h2 className={styles.title}>Редактировать категорию</h2>

          <Input
            className={styles.field}
            label={'На английском: '}
            placeholder={'seafood'}
            register={register('eng', Validate.categoryEng())}
            error={errors.eng}
            onFocus={clearServerError}
          />

          <Input
            className={styles.field}
            label={'На русском: '}
            placeholder={'морепродукты'}
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

export default UpdateCategoryForm
