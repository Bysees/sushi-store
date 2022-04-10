import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import Modal from '../../common/Modal'
import Input from '../fields/Input'

import { useCreateCategoryMutation } from '../../../redux/RTKquery/category'
import Validate from '../Validate'

import styles from '../form.module.scss'

const CreateCategoryForm = ({ onHide }) => {

  const navigate = useNavigate()
  const [successfulMessage, setSuccessfulMessage] = useState('')
  const { formState: { errors }, handleSubmit, register, reset } = useForm()

  const [createCategory, { isLoading, error: serverError }] = useCreateCategoryMutation()

  const onSubmit = async (formData) => {
    const response = await createCategory(formData)

    if (!response.error) {
      setSuccessfulMessage(response.data.message)
      const newCategoryLink = formData.category.eng
      navigate(newCategoryLink)
      reset()
    }
  }

  return (
    <Modal>
      <div className={styles.wrapper}>
        <form className={styles.form}
          onSubmit={handleSubmit(onSubmit)}
          autoComplete='off'
        >

          <button type='button' className={styles.exit} onClick={onHide}>
            <span>&times;</span>
          </button>

          <h2 className={styles.title}>Добавить категорию</h2>

          <Input
            className={styles.field}
            label={'На английском: '}
            name={'category.eng'}
            placeholder={'pizza'}

            validate={Validate.categoryEng()}
            register={register}
            errors={errors}
          />

          <Input
            className={styles.field}
            label={'На русском: '}
            name={'category.rus'}
            placeholder={'пицца'}

            validate={Validate.categoryRus()}
            register={register}
            errors={errors}
            serverError={serverError?.data?.message}
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

export default CreateCategoryForm