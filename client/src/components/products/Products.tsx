import { useState } from 'react'
import { useParams } from 'react-router-dom'
import cn from 'classnames'
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons'

import { LabelExtented } from '../../models/product'

import ButtonIcon from '../common/ButtonIcon'
import Container from '../common/Container'
import CreateProductForm from '../forms/product/CreateProductForm'
import Product from './Product'
import NotFound from '../../pages/not-found/NotFound'
import FilterByLabel from '../filters/FilterByLabel'

import { useToogle } from '../../hooks/useToogle'
import { useTypedSelector } from '../../redux/hooks'
import { useGetProductsQuery } from '../../services/api/productApi'
import { skipToken } from '@reduxjs/toolkit/dist/query'

import styles from './products.module.scss'

const Products = () => {
  const LABEL_ALL = 'all'
  const [filterLabel, setFilterLabel] = useState<LabelExtented>(LABEL_ALL)
  const isFilterAll = filterLabel === LABEL_ALL

  const { category } = useParams()
  const fetchParams = category ? { category } : null

  const {
    currentData: products = [],
    isSuccess,
    isError
  } = useGetProductsQuery(fetchParams ?? skipToken)

  const computedLabels: LabelExtented[] = [
    LABEL_ALL,
    ...new Set(products.flatMap((product) => product.labels))
  ]

  const filtredProducts = isFilterAll
    ? products
    : products.filter((product) => product.labels.includes(filterLabel))

  const isAdmin = useTypedSelector((state) => state.user.role === 'admin')
  const [isCreateProduct, showProductForm, hideProductForm] = useToogle(false)

  if (isError) {
    return <NotFound />
  }

  if (!isSuccess) {
    return null
  }

  return (
    <div className={styles.translate}>
      <FilterByLabel
        labels={computedLabels}
        currentLabel={filterLabel}
        setFilterLabel={setFilterLabel}
      />
      <Container>
        <div className={styles.products}>
          {filtredProducts.map((product) => (
            <Product key={product.id} {...product} />
          ))}

          {!isAdmin && !filtredProducts.length && (
            <div className={styles.zeroProductsTitle}>
              Товары пока не добавлены...
            </div>
          )}

          {isAdmin && isFilterAll && (
            <ButtonIcon
              className={cn(styles.product, styles.addProduct)}
              onClick={showProductForm}
              icon={faCirclePlus}
              title={'Добавить новый продукт'}
            />
          )}
        </div>

        {isCreateProduct && <CreateProductForm onHide={hideProductForm} />}
      </Container>
    </div>
  )
}

export default Products
