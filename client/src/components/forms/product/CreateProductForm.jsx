import React from 'react'
import { useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'

import Modal from '../../common/Modal'
import ProductForm from './ProductForm'

import Validate from '../Validate'
import { useCreateProductMutation } from '../../../redux/RTKquery/product'

const NewProduct = ({ onHide }) => {

  const { formState: { errors }, handleSubmit, register } = useForm({
    defaultValues: {
      title: 'qwerty',
      price: 666,
      structure: {
        calorie: 50,
        carbohydrates: 50,
        fat: 50,
        protein: 50,
        weight: 50
      }
    }
  })
  const [createProduct, { isLoading }] = useCreateProductMutation()
  const { productType } = useParams()

  //  error.data.message //? Ошибка с сервера

  const onSubmit = async (data) => {
    const formData = new FormData()
    const hasImage = typeof data.img[0] === 'object'
    if (hasImage) {
      formData.append('picture', data.img[0])
    }
    data = { ...data, img: null }
    formData.append('product', JSON.stringify(data))

    await createProduct({ productType, formData })
  }

  return (
    <Modal onHide={onHide}>
      <ProductForm
        onSubmit={handleSubmit(onSubmit)}
        register={register}
        validate={Validate}
        errors={errors}
        isLoading={isLoading}
      />
    </Modal>
  )
}

export default NewProduct