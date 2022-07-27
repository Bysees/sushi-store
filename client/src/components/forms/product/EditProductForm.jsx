import React, { useState } from 'react'
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

  const [successfulMessage, setSuccessfulMessage] = useState('')

  const [previewImg, setPreviewImg] = useState(product.img)
  const [imgFile, setImgFile] = useState(null)


  const { category } = useParams()
  const [updateProduct, { isLoading, error: serverError }] = useUpdateProductMutation()

  const onSubmit = async (data) => {
    const formData = new FormData()

    if (imgFile) {
      formData.append('picture', imgFile)
    }

    if (!imgFile && !previewImg) {
      data.img = ''
    }

    formData.append('product', JSON.stringify(data))

    const response = await updateProduct({ category, body: formData })
    if (!response.error) {
      setSuccessfulMessage(response.data.message)
    }
  }

  return (
    <Modal>
      <ProductForm
        onSubmit={handleSubmit(onSubmit)}
        register={register}
        validate={Validate}
        errors={errors}
        serverError={serverError?.data?.message}
        isLoading={isLoading}
        onHide={onHide}

        img={previewImg}
        setPreviewImg={setPreviewImg}
        setImgFile={setImgFile}

        successfulMessage={successfulMessage}
        setSuccessfulMessage={setSuccessfulMessage}
      />
    </Modal>
  )
}

export default EditProductForm