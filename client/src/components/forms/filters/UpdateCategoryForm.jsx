import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import Modal from '../../common/Modal'
import Input from '../fields/Input'

import { useUpdateCategoryMutation } from '../../../redux/RTKquery/category'
import Validate from '../Validate'

import styles from '../form.module.scss'


const UpdateCategoryForm = ({ onHide, currentCategory, categories }) => {

  const currentCategoryValues = categories.find(category => category.eng === currentCategory)

  const navigate = useNavigate()
  const { formState: { errors }, handleSubmit, register } = useForm({
    defaultValues: {
      category: currentCategoryValues
    }
  })

  const [successfulMessage, setSuccessfulMessage] = useState('')

  const [updateCategory, { isLoading, error, isError }] = useUpdateCategoryMutation()

  let serverError = null
  if (isError) {
    serverError = error?.data?.message || 'Какие-то неполадки, в данный момент невозможно обновить категорию'
  }

  const onSubmit = async (formData) => {

    const response = await updateCategory({ category: currentCategory, body: formData })
    if (!response.error) {
      setSuccessfulMessage(response.data.message)
      const newCategoryLink = formData.category.eng
      navigate(newCategoryLink)
    }
  }

  return (
    <Modal>
      <div className={styles.wrapper} >
        <form className={styles.form}
          onSubmit={handleSubmit(onSubmit)}
          autoComplete='off'>

          <button type='button' className={styles.exit} onClick={onHide}>
            <span>&times;</span>
          </button>

          <h2 className={styles.title}>Редактировать категорию</h2>

          <Input
            className={styles.field}
            label={'На английском: '}
            name={'category.eng'}
            placeholder={'seafood'}

            validate={Validate.categoryEng()}
            register={register}
            errors={errors}
          />

          <Input
            className={styles.field}
            label={'На русском: '}
            name={'category.rus'}
            placeholder={'морепродукты'}

            validate={Validate.categoryRus()}
            register={register}
            errors={errors}
            serverError={serverError}
          />

          {successfulMessage &&
            <div className={styles.success}>{successfulMessage}</div>}

          <div className={styles.button}>
            <button disabled={isLoading}>Подтвердить</button>
          </div>

        </form>
      </div>
    </Modal>
  )
}

export default UpdateCategoryForm