import React from 'react'
import { useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'

import Modal from '../../common/Modal'
import ProductForm from './ProductForm'

import Validate from '../Validate'
import { ProductService } from '../../../api/productService'

const NewProduct = ({ onHide }) => {

  const { formState: { errors }, handleSubmit, register } = useForm()

  const { productType } = useParams()

  const onSubmit = async (data) => {
    const formData = new FormData()
    if (typeof data.img[0] === 'object') {
      formData.append('picture', data.img[0])
    }
    data = { ...data, img: null }
    formData.append('product', JSON.stringify(data))
    await ProductService.createProduct(formData, productType)
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