import { FC, useState } from 'react'
import { useParams } from 'react-router-dom'
import { SubmitHandler, useForm } from 'react-hook-form'

import { IProduct } from '../../../models/product'

import Modal from '../../common/Modal'
import ProductForm from './ProductForm'

import {
  isErrorWithMessage,
  isFetchErrorResponse
} from '../../../services/api/helper'
import { useCreateProductMutation } from '../../../services/api/productApi'
import { useSnackbar } from 'notistack'

interface Props {
  onHide: () => void
}

const CreateProductForm: FC<Props> = ({ onHide }) => {
  const { category } = useParams()
  const { enqueueSnackbar } = useSnackbar()

  const {
    formState: { errors },
    handleSubmit,
    register,
    reset
  } = useForm<IProduct>({
    defaultValues: {
      title: '',
      price: 0,
      labels: [],
      structure: {
        calorie: 0,
        carbohydrates: 0,
        fat: 0,
        protein: 0,
        weight: 0,
        ingredients: []
      },
      img: ''
    }
  })

  const [createProduct, { isLoading }] = useCreateProductMutation()
  const [serverError, setServerError] = useState('')
  const clearServerError = () => setServerError('')

  const [previewImg, setPreviewImg] = useState('')
  const [imgFile, setImgFile] = useState<File | null>(null)

  const onSubmit: SubmitHandler<IProduct> = async (productData) => {
    if (!category) {
      return
    }

    const formData = new FormData()

    if (imgFile) {
      formData.append('picture', imgFile)
    }

    formData.append('product', JSON.stringify(productData))

    try {
      await createProduct({
        category,
        body: formData
      }).unwrap()

      reset()
      setPreviewImg('')
      setImgFile(null)
      const successMessage = `${productData.title} успешно добавлен!`
      enqueueSnackbar(successMessage, { variant: 'success' })
      clearServerError()
    } catch (err) {
      let errMessage: string | undefined
      if (isFetchErrorResponse(err)) {
        errMessage = err.data?.message
      }
      if (isErrorWithMessage(err)) {
        errMessage = err.message
      }
      if (errMessage) {
        return setServerError(errMessage)
      }
      throw err
    }
  }

  return (
    <Modal>
      <ProductForm
        onSubmit={handleSubmit(onSubmit)}
        register={register}
        errors={errors}
        serverError={serverError}
        isLoading={isLoading}
        previewImg={previewImg}
        setPreviewImg={setPreviewImg}
        setImgFile={setImgFile}
        clearNotifications={clearServerError}
        onHide={onHide}
      />
    </Modal>
  )
}

export default CreateProductForm
