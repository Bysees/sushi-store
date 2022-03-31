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
import { useGetProductsByTypeQuery } from '../../redux/RTKquery/product'

import styles from './products.module.scss'

const Products = () => {

  const isAdmin = useSelector(state => state.user.role === 'admin')

  const [isCreateProduct, showProductForm, hideProductForm] = useToogle(false)

  const { productType } = useParams()
  const { data: initialProducts } = useGetProductsByTypeQuery(productType)
  const [products, setProducts] = useState([])
  const [labels, setLabels] = useState([])
  const [animationTrigger, setAnimationTrigger] = useState(false)

  useLayoutEffect(() => {
    if (initialProducts) {
      setProducts(initialProducts)
      setLabels([...new Set(initialProducts.flatMap((product) => product.labels))])
    }
  }, [initialProducts])

  useLayoutEffect(() => {
    setAnimationTrigger(trigger => !trigger)
  }, [productType])


  const filterByLabel = (label) => {
    if (label === labelTitles.eng.all) {
      return setProducts(initialProducts)
    }

    const filtredProducts = initialProducts.filter(
      (product) => product.labels.includes(label)
    )

    setProducts(filtredProducts)
  }

  return (
    <div key={animationTrigger} className={styles.translate}>
      <FilterLabels labels={labels} filterHandler={filterByLabel} />
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