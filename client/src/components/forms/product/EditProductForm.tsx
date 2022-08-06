import { FC, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'

import { IProduct } from '../../../models/product'

import Modal from '../../common/Modal'
import ProductForm from './ProductForm'

import {
  isErrorWithMessage,
  isFetchErrorResponse
} from '../../../services/api/helper'
import { useUpdateProductMutation } from '../../../services/api/productApi'
import { useSnackbar } from 'notistack'

interface Props {
  onHide: () => void
  product: IProduct
}

const EditProductForm: FC<Props> = ({ onHide, product }) => {
  const { category } = useParams()
  const { enqueueSnackbar } = useSnackbar()

  const {
    formState: { errors },
    handleSubmit,
    register
  } = useForm<IProduct>({
    defaultValues: product
  })

  const [updateProduct, { isLoading }] = useUpdateProductMutation()
  const [serverError, setServerError] = useState('')
  const clearServerError = () => setServerError('')

  const [previewImg, setPreviewImg] = useState<string>(product.img)
  const [imgFile, setImgFile] = useState<File | null>(null)

  const onSubmit: SubmitHandler<IProduct> = async (productData) => {
    if (!category) {
      return
    }

    const formData = new FormData()

    if (imgFile) {
      formData.append('picture', imgFile)
    }

    if (!imgFile && !previewImg) {
      productData.img = ''
    }

    formData.append('product', JSON.stringify(productData))

    try {
      await updateProduct({
        category,
        body: formData
      }).unwrap()

      const successMessage = `"${productData.title}" успешно изменён`
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

export default EditProductForm
