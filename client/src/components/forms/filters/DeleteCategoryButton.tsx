import { FC } from 'react'
import { useTypedDispatch, useTypedSelector } from '../../../redux/hooks'
import { useNavigate } from 'react-router-dom'
import { useSnackbar } from 'notistack'

import { ICategory, IProduct } from '../../../models/product'

import { Paths } from '../../../routes/links'
import { useDeleteCategoryMutation } from '../../../services/api/categoryApi'
import {
  isErrorWithMessage,
  isFetchErrorResponse
} from '../../../services/api/helper'
import { removeFromCart } from '../../../redux/slices/cartSlice'

interface Props {
  className: string
  category: ICategory
}

const DeleteCategoryButton: FC<Props> = ({ className, category }) => {
  const dispatch = useTypedDispatch()
  const navigate = useNavigate()
  const { enqueueSnackbar } = useSnackbar()

  const cartItems = useTypedSelector((state) => state.cart.cartItems)
  const [deleteCategory, { isLoading }] = useDeleteCategoryMutation()

  const deleteOrderedProductsFromCart = (products: IProduct[]) => {
    cartItems.forEach((cartItem) => {
      const productInCart = products.find(
        (product) => product.id === cartItem.id
      )

      if (productInCart) {
        dispatch(
          removeFromCart({
            id: cartItem.id,
            amount: cartItem.amount
          })
        )
      }
    })
  }

  const removeCategory = async () => {
    const isRemove = window.confirm(
      'Все товары в категории будут безвозвратно потеряны, всё ровно удалить?'
    )

    if (isRemove) {
      try {
        const deletedProductsFromCategory = await deleteCategory(
          category.eng
        ).unwrap()
        deleteOrderedProductsFromCart(deletedProductsFromCategory)
        navigate(Paths.menu)
        const successMessage = `Удаление "${category.rus}" прошло успешно!`
        enqueueSnackbar(successMessage, { variant: 'success' })
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
    <button className={className} onClick={removeCategory} disabled={isLoading}>
      <span>&times;</span>
    </button>
  )
}

export default DeleteCategoryButton
