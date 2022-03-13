import React from 'react'

import Modal from '../../common/Modal'

import Validate from '../Validate'
import { useForm } from 'react-hook-form'
import ProductForm from './ProductForm'

const NewProduct = ({ onHide }) => {

  const { formState: { errors }, handleSubmit, register } = useForm()

  const onSubmit = (formData) => {
    console.log(formData)
  }

  return (
    <Modal onHide={onHide}>
      <ProductForm
        onSubmit={handleSubmit(onSubmit)}
        register={register}
        validate={Validate}
        errors={errors}
      />
    </Modal>
  )
}

export default NewProduct