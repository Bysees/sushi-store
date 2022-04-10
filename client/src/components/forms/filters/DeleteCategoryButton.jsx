import React from 'react'
import { useNavigate } from 'react-router-dom'

import { useDeleteCategoryMutation } from '../../../redux/RTKquery/category'
import { appRoutes } from '../../../consts/links'

const DeleteCategoryButton = ({ className, category }) => {

  const navigate = useNavigate()
  const [deleteCategory, { isLoading }] = useDeleteCategoryMutation()

  const removeCategory = async () => {
    const isRemove = window.confirm('Все товары в категории будут безвозвратно потеряны, всё ровно удалить?')

    if (isRemove) {
      const response = await deleteCategory(category)

      if (!response.error) {
        navigate(appRoutes.menu)
      } else {
        alert(response.error.data.message)
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