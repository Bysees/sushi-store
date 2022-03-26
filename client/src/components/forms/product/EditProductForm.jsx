import React from 'react'
import { useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'

import Modal from '../../common/Modal'
import ProductForm from './ProductForm'

import Validate from '../Validate'
import { useUpdateProductMutation } from '../../../redux/RTKquery/product'


const EditProductForm = ({ onHide, product }) => {

  const { formState: { errors }, handleSubmit, register } = useForm({
    defaultValues: product
  })

  const { productType } = useParams()

  const [updateProduct, { isLoading }] = useUpdateProductMutation()

  const onSubmit = async (data) => {
    const formData = new FormData()
    const hasImage = typeof data.img[0] === 'object'
    if (hasImage) {
      formData.append('picture', data.img[0])
    }
    data = { ...data, img: product.img }
    formData.append('product', JSON.stringify(data))
    await updateProduct({ productType, formData })
  }

  return (
    <Modal onHide={onHide}>
      <ProductForm
        img={product.img}
        onSubmit={handleSubmit(onSubmit)}
        register={register}
        validate={Validate}
        errors={errors}
        isLoading={isLoading}
      />
    </Modal>
  )
}

export default EditProductForm