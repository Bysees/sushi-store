import React, { useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons'
import cn from 'classnames'

import ButtonIcon from '../common/ButtonIcon'
import Container from '../common/Container'
import CreateProductForm from '../forms/product/CreateProductForm'
import Product from './Product'
import NotFound from '../../pages/not-found/NotFound'
import FilterByLabel from '../filters/FilterByLabel'

import { labelTitles } from '../../consts/labels'
import { useToogle } from '../../hooks/useToogle'
import { useGetProductsQuery } from '../../redux/RTKquery/product'

import styles from './products.module.scss'


const Products = () => {
  const [filterLabel, setFilterLabel] = useState(labelTitles.eng.all)
  const isLabelEqualAll = filterLabel === labelTitles.eng.all

  const { category } = useParams()
  const { currentData, isError } = useGetProductsQuery({ category })

  const products = currentData?.items
  const labels = products ? [...new Set(products.flatMap(product => product.labels))] : []

  const filtredProducts = useMemo(() => {
    if (!products) {
      return []
    }

    if (filterLabel === labelTitles.eng.all) {
      return products
    }

    return products.filter((product) => product.labels.includes(filterLabel))
  }, [products, filterLabel])

  const isAdmin = useSelector(state => state.user.role === 'admin')
  const [isCreateProduct, showProductForm, hideProductForm] = useToogle(false)


  if (isError) {
    return <NotFound />
  }

  return (
    <div className={styles.translate}>
      <FilterByLabel
        labels={labels}
        currentLabel={filterLabel}
        setFilterLabel={setFilterLabel}
      />

      <Container>
        <div className={styles.products}>
          {filtredProducts.map((product) => (
            <Product key={product.id} {...product} />
          ))}

          {!isAdmin && !filtredProducts.length &&
            <div className={styles.zeroProductsTitle}>
              Товары пока не добавлены...
            </div>
          }

          {isAdmin && isLabelEqualAll &&
            <ButtonIcon
              className={cn(styles.product, styles.addProduct)}
              onClick={showProductForm}
              icon={faCirclePlus}
              title={'Добавить новый продукт'}
            />
          }
        </div>

        {isCreateProduct && <CreateProductForm onHide={hideProductForm} />}
      </Container>

    </div>)
}

export default Products