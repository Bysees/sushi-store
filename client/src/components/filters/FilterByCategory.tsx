import { NavLink, useParams } from 'react-router-dom'
import { useTypedSelector } from '../../redux/hooks'
import { faCirclePlus, faEdit } from '@fortawesome/free-solid-svg-icons'
import cn from 'classnames'

import Container from '../common/Container'
import ButtonIcon from '../common/ButtonIcon'
import CreateCategoryForm from '../forms/filters/CreateCategoryForm'
import UpdateCategoryForm from '../forms/filters/UpdateCategoryForm'
import DeleteCategoryButton from '../forms/filters/DeleteCategoryButton'

import { useToogle } from '../../hooks/useToogle'

import styles from './filterByCategory.module.scss'
import categoryImg from '../../images/category-mock.jpg'
import { useGetCategoriesQuery } from '../../services/api/categoryApi'
import { useState } from 'react'

const FilterByCategory = () => {
  const isAdmin = useTypedSelector((state) => state.user.role === 'admin')
  const [isCreateCategory, showCreateCategory, hideCreateCategory] =
    useToogle(false)
  const [isUpdateCategory, showUpdateCategory, hideUpdateCategory] =
    useToogle(false)
  const [updateCategory, setUpdateCategory] = useState<string | null>(null)

  const onUpdateHandler = (category: string) => () => {
    setUpdateCategory(category)
    showUpdateCategory()
  }

  const { category: currentCategory } = useParams()
  const { data: categories = [], isSuccess } = useGetCategoriesQuery()

  const toogleActiveClass = ({ isActive }: { isActive: boolean }) =>
    isActive ? styles.link_active : ''

  return (
    <Container>
      <div
        className={cn(styles.filters, currentCategory && styles.filters_mini)}>
        {isSuccess &&
          categories.map((category) => (
            <div className={styles.filters__item} key={category.eng}>
              <NavLink
                className={toogleActiveClass}
                to={category.eng}
                draggable={false}>
                <img src={categoryImg} alt='category' draggable={false} />
                <span>{category.rus}</span>
              </NavLink>

              {isAdmin && (
                <>
                  <ButtonIcon
                    className={styles.update}
                    onClick={onUpdateHandler(category.eng)}
                    icon={faEdit}
                  />

                  <DeleteCategoryButton
                    className={styles.remove}
                    category={category}
                  />
                </>
              )}
            </div>
          ))}

        {isAdmin && (
          <div className={styles.filters__item}>
            <ButtonIcon
              onClick={showCreateCategory}
              className={styles.create}
              icon={faCirclePlus}
              title={'добавить'}
            />
          </div>
        )}

        {isCreateCategory && <CreateCategoryForm onHide={hideCreateCategory} />}
        {isUpdateCategory && updateCategory && (
          <UpdateCategoryForm
            onHide={hideUpdateCategory}
            currentCategory={updateCategory}
            categories={categories}
          />
        )}
      </div>
    </Container>
  )
}

export default FilterByCategory
