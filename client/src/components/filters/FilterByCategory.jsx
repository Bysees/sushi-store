import React from 'react'
import { NavLink, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { faCirclePlus, faEdit } from '@fortawesome/free-solid-svg-icons'

import Container from '../common/Container'
import ButtonIcon from '../common/ButtonIcon'
import CreateCategoryForm from '../forms/filters/CreateCategoryForm'
import UpdateCategoryForm from '../forms/filters/UpdateCategoryForm'
import DeleteCategoryButton from '../forms/filters/DeleteCategoryButton'

import { useToogle } from '../../hooks/useToogle'
import { useGetCategoriesQuery } from '../../redux/RTKquery/category'

import styles from './filter.module.scss'


const FilterByCategory = () => {

  const { category } = useParams()
  const isAdmin = useSelector(state => state.user.role === 'admin')

  const toogleActiveClass = ({ isActive }) => isActive ? styles.active : undefined

  const [isCreateCategory, showCreateCategory, hideCreateCategory] = useToogle(false)
  const [isUpdateCategory, showUpdateCategory, hideUpdateCategory] = useToogle(false)

  const { data, isSuccess } = useGetCategoriesQuery()
  const categories = data?.categories

  return (
    <Container>
      <div className={styles.filteringProduct}>

        {isSuccess && categories.map((category) => (
          <NavLink key={category.eng} to={category.eng} className={toogleActiveClass}>
            {isAdmin &&
              <ButtonIcon
                className={styles.update}
                onClick={showUpdateCategory}
                icon={faEdit}
              />
            }

            {category.rus}

            {isAdmin &&
              <DeleteCategoryButton className={styles.remove} category={category.eng} />
            }
          </NavLink>
        ))}

        {isAdmin &&
          <ButtonIcon
            onClick={showCreateCategory}
            className={styles.createCategory}
            icon={faCirclePlus}
          />
        }

        {isCreateCategory && <CreateCategoryForm onHide={hideCreateCategory} />}
        {isUpdateCategory && (
          <UpdateCategoryForm
            onHide={hideUpdateCategory}
            currentCategory={category}
            categories={categories}
          />
        )}

      </div>
    </Container>
  )
}

export default FilterByCategory