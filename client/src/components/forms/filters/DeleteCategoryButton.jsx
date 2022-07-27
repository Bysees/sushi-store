import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { appRoutes } from '../../../consts/links'
import { useDeleteCategoryMutation } from '../../../redux/RTKquery/category'
import { removeFromCart } from '../../../redux/slices/cartSlice'


const DeleteCategoryButton = ({ className, category }) => {

  const dispatch = useDispatch()
  const cartItems = useSelector(state => state.cart.cartItems)
  const navigate = useNavigate()
  const [deleteCategory, { isLoading }] = useDeleteCategoryMutation()

  const deleteOrderedProductsFromCart = (productItems) => {
    cartItems.forEach(cartItem => {
      const productItem = productItems.find(productItem => productItem.id === cartItem.id)

      if (productItem) {
        dispatch(removeFromCart({ id: cartItem.id, amount: cartItem.amount }))
      }
    })
  }

  const removeCategory = async () => {
    const isRemove = window.confirm('Все товары в категории будут безвозвратно потеряны, всё ровно удалить?')

    if (isRemove) {
      const response = await deleteCategory(category)

      if (!response.error) {
        const deletedItems = response.data.products.items
        deleteOrderedProductsFromCart(deletedItems)
        navigate(appRoutes.menu)
      } else {
        alert(response.error?.data?.message || 'Какие-то неполадки, в данный момент невозможно удалить категорию')
      }
    }
  }

  return (
    <button
      className={className}
      onClick={removeCategory}
      disabled={isLoading}
    >
      <span>&times;</span>
    </button>
  )
}

export default DeleteCategoryButton