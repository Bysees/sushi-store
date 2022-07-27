import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'

import Modal from '../../common/Modal'
import ProductForm from './ProductForm'

import Validate from '../Validate'
import { useCreateProductMutation } from '../../../redux/RTKquery/product'


const CreateProductForm = ({ onHide }) => {
  const { category } = useParams()

  const { formState: { errors }, handleSubmit, register, reset } = useForm({
    defaultValues: {
      title: '',
      price: null,
      labels: [],
      structure: {
        calorie: null,
        carbohydrates: null,
        fat: null,
        protein: null,
        weight: null,
        ingredients: []
      }
    }
  })

  const [successfulMessage, setSuccessfulMessage] = useState('')

  const [previewImg, setPreviewImg] = useState('')
  const [imgFile, setImgFile] = useState(null)

  const [createProduct, { isLoading, error: serverError }] = useCreateProductMutation()

  const onSubmit = async (data) => {
    const formData = new FormData()

    if (imgFile) {
      formData.append('picture', imgFile)
    } else {
      data.img = ''
    }

    formData.append('product', JSON.stringify(data))

    const response = await createProduct({ category, body: formData })
    if (!response.error) {
      reset()
      setPreviewImg('')
      setImgFile(null)
      setSuccessfulMessage(response.data.message)
    }
  }

  return (
    <Modal>
      <ProductForm
        onSubmit={handleSubmit(onSubmit)}
        register={register}
        errors={errors}
        validate={Validate}
        serverError={serverError?.data?.message}
        isLoading={isLoading}

        setPreviewImg={setPreviewImg}
        setImgFile={setImgFile}
        img={previewImg}

        setSuccessfulMessage={setSuccessfulMessage}
        successfulMessage={successfulMessage}
        onHide={onHide}
      />
    </Modal>
  )
}

export default CreateProductForm