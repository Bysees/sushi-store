import React, { useLayoutEffect, useRef, useState } from 'react'
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
import NotFound from '../../pages/not-found/NotFound'

const Products = () => {

  const isAdmin = useSelector(state => state.user.role === 'admin')

  const [isCreateProduct, showProductForm, hideProductForm] = useToogle(false)

  const { productType } = useParams()
  const [currentProductType, setCurrentProductType] = useState(productType)
  const prevProductType = useRef('')

  const [labels, setLabels] = useState([])
  const [filterLabel, setFilterLabel] = useState(labelTitles.eng.all)
  const [displayLabel, setDisplayLabel] = useState(labelTitles.eng.all)

  const [animationTrigger, setAnimationTrigger] = useState(false)

  const { data: products, isLoading, isFetching, isError, error } = useGetProductsQuery({
    productType: currentProductType,
    label: filterLabel
  })

  useLayoutEffect(() => {
    setFilterLabel(labelTitles.eng.all)
    setCurrentProductType(productType)
  }, [productType])

  useLayoutEffect(() => {
    const isProductTypeChanged = prevProductType.current !== productType
    if (!isFetching && !isError) {
      if (isProductTypeChanged) {
        setAnimationTrigger(trigger => !trigger)
        prevProductType.current = productType
      }
    }
  }, [productType, isFetching, isError])

  useLayoutEffect(() => {
    if (!isFetching && !isError) {
      if (filterLabel === labelTitles.eng.all) {
        setDisplayLabel(labelTitles.eng.all)
        setLabels([...new Set(products.flatMap((product) => product.labels))])
      }
    }
  }, [products, filterLabel, isFetching, isError])


  if (isError) {
    return <NotFound />
  }

  return (<>
    {!isLoading &&
      <div key={animationTrigger} className={styles.translate}>
        <FilterLabels
          labels={labels}
          currentLabel={displayLabel}
          setFilterLabel={setFilterLabel}
          setDisplayLabel={setDisplayLabel}
        />
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
    }
  </>)
}

export default Products