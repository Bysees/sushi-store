import React from 'react'
import { NavLink, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { faCirclePlus, faEdit } from '@fortawesome/free-solid-svg-icons'
import cn from 'classnames'

import Container from '../common/Container'
import ButtonIcon from '../common/ButtonIcon'
import CreateCategoryForm from '../forms/filters/CreateCategoryForm'
import UpdateCategoryForm from '../forms/filters/UpdateCategoryForm'
import DeleteCategoryButton from '../forms/filters/DeleteCategoryButton'

import { useToogle } from '../../hooks/useToogle'
import { useGetCategoriesQuery } from '../../redux/RTKquery/category'

import styles from './filterByCategory.module.scss'
import categoryImg from '../../images/category-mock.jpg'


const FilterByCategory = () => {
  const isAdmin = useSelector(state => state.user.role === 'admin')
  const [isCreateCategory, showCreateCategory, hideCreateCategory] = useToogle(false)
  const [isUpdateCategory, showUpdateCategory, hideUpdateCategory] = useToogle(false)

  const { category: currentCategory } = useParams()
  const { data, isSuccess } = useGetCategoriesQuery()
  const categories = data?.categories

  const toogleActiveClass = ({ isActive }) => isActive ? styles.link_active : ''

  return (
    <Container>
      <div className={cn(styles.filters, currentCategory && styles.filters_mini)}>

        {isSuccess && categories.map((category) => (
          <div className={styles.filters__item} key={category.eng}>
            <NavLink className={toogleActiveClass} to={category.eng} draggable={false}>
              <img src={categoryImg} alt="category" draggable={false} />
              <span>{category.rus}</span>
            </NavLink>

            {isAdmin && (
              <>
                <ButtonIcon
                  className={styles.update}
                  onClick={showUpdateCategory}
                  icon={faEdit}
                />

                <DeleteCategoryButton
                  className={styles.remove}
                  category={category.eng}
                />
              </>
            )}
          </div>
        ))}

        {isAdmin &&
          <div className={styles.filters__item}>
            <ButtonIcon
              onClick={showCreateCategory}
              className={styles.create}
              icon={faCirclePlus}
              title={'добавить'}
            />
          </div>
        }


        {isCreateCategory && <CreateCategoryForm onHide={hideCreateCategory} />}
        {isUpdateCategory && (
          <UpdateCategoryForm
            onHide={hideUpdateCategory}
            currentCategory={currentCategory}
            categories={categories}
          />
        )}

      </div>
    </Container >
  )
}

export default FilterByCategory