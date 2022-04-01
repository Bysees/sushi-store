import React, { useLayoutEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons'
import cn from 'classnames'

import ButtonIcon from '../common/ButtonIcon'
import Container from '../common/Container'
import FilterLabels from '../filters/FilterLabels'
import CreateProductForm from '../forms/product/CreateProductForm'
import Product from './Product'

import { labelTitles } from '../../consts/labels'
import { useToogle } from '../../hooks/useToogle'
import { useGetProductsQuery } from '../../redux/RTKquery/product'

import styles from './products.module.scss'

const Products = () => {

  const isAdmin = useSelector(state => state.user.role === 'admin')

  const [isCreateProduct, showProductForm, hideProductForm] = useToogle(false)

  const { productType } = useParams()
  const [labels, setLabels] = useState([])
  const [filterLabel, setFilterLabel] = useState(labelTitles.eng.all)
  const [animationTrigger, setAnimationTrigger] = useState(false)

  const { data: products, isLoading } = useGetProductsQuery({ productType, label: filterLabel })

  useLayoutEffect(() => {
    setFilterLabel(labelTitles.eng.all)
    setAnimationTrigger(trigger => !trigger)
  }, [productType])

  useLayoutEffect(() => {
    if (products && filterLabel === labelTitles.eng.all) {
      setLabels([...new Set(products.flatMap((product) => product.labels))])
    }
  }, [products, filterLabel])


  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div key={animationTrigger} className={styles.translate}>
      <FilterLabels
        labels={labels}
        setFilterLabel={setFilterLabel}
        filterLabel={filterLabel} />
      <Container>
        <div className={styles.products}>

          {products.map((product) => (
            <Product key={product.id} {...product} />
          ))}

          {isAdmin &&
            <ButtonIcon
              className={cn(styles.product, styles.addProduct)}
              onClick={showProductForm}
              icon={faCirclePlus}
              title={'Добавить новый продукт'}
            />}

        </div>
      </Container>

      {isCreateProduct && <CreateProductForm onHide={hideProductForm} />}
    </div>
  )
}

export default Products