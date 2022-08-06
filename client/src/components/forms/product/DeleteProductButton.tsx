import { enqueueSnackbar } from 'notistack'
import { FC } from 'react'
import { useTypedDispatch } from '../../../redux/hooks'
import { removeFromCart } from '../../../redux/slices/cartSlice'
import {
  isErrorWithMessage,
  isFetchErrorResponse
} from '../../../services/api/helper'
import { useDeleteProductMutation } from '../../../services/api/productApi'

interface Props {
  className: string
  category: string
  title: string
  id: string
  amount: number
}

const DeleteProductButton: FC<Props> = ({
  className,
  children,
  category,
  title,
  id,
  amount
}) => {
  const dispatch = useTypedDispatch()

  const removeProductFromCart = () => {
    if (amount > 0) {
      dispatch(removeFromCart({ amount, id }))
    }
  }

  const [deleteProduct, { isLoading }] = useDeleteProductMutation()

  const removeProduct = async () => {
    const isRemove = window.confirm(
      `Вы действительно хотите удалить "${title}"`
    )

    if (isRemove) {
      try {
        await deleteProduct({ category, id }).unwrap()
        removeProductFromCart()
        const successMessage = `Удаление "${title}" прошло успешно`
        enqueueSnackbar(successMessage, {
          variant: 'success',
          autoHideDuration: 5500
        })
      } catch (err) {
        let errMessage: string | undefined
        if (isFetchErrorResponse(err)) {
          errMessage = err.data?.message
        }
        if (isErrorWithMessage(err)) {
          errMessage = err.message
        }
        if (errMessage) {
          return enqueueSnackbar(errMessage, { variant: 'error' })
        }
        throw err
      }
    }
  }

  return (
    <div className={className}>
      <button onClick={removeProduct} disabled={isLoading}>
        {children}
      </button>
    </div>
  )
}

export default DeleteProductButton
