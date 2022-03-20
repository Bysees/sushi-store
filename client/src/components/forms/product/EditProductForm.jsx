import React from 'react'
import { useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'

import Modal from '../../common/Modal'
import ProductForm from './ProductForm'

import Validate from '../Validate'
import { ProductService } from '../../../api/productService'


const EditProductForm = ({ onHide, product }) => {

  const { formState: { errors }, handleSubmit, register } = useForm({
    defaultValues: product
  })

  const { productType } = useParams()

  const onSubmit = async (data) => {
    const formData = new FormData()
    if (typeof data.img[0] === 'object') {
      formData.append('picture', data.img[0])
    }
    data = { ...data, img: product.img }
    formData.append('product', JSON.stringify(data))
    await ProductService.editProduct(formData, productType)
  }

  return (
    <Modal onHide={onHide}>
      <ProductForm
        img={product.img}
        onSubmit={handleSubmit(onSubmit)}
        register={register}
        validate={Validate}
        errors={errors}
      />
    </Modal>
  )
}

export default EditProductForm