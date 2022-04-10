import React, { useLayoutEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons'
import cn from 'classnames'

import ButtonIcon from '../common/ButtonIcon'
import Container from '../common/Container'
import FilterByLabel from '../filters/FilterByLabel'
import CreateProductForm from '../forms/product/CreateProductForm'
import Product from './Product'
import NotFound from '../../pages/not-found/NotFound'

import { labelTitles } from '../../consts/labels'
import { useToogle } from '../../hooks/useToogle'
import { useGetProductsQuery } from '../../redux/RTKquery/product'

import styles from './products.module.scss'

const Products = () => {

  const isAdmin = useSelector(state => state.user.role === 'admin')

  const [isCreateProduct, showProductForm, hideProductForm] = useToogle(false)

  const { category } = useParams()
  const [currentCategory, setCurrentCategory] = useState(category)
  const prevCategory = useRef('')

  const [labels, setLabels] = useState([])
  const [filterLabel, setFilterLabel] = useState(labelTitles.eng.all)
  const [displayLabel, setDisplayLabel] = useState(labelTitles.eng.all)

  const [animationTrigger, setAnimationTrigger] = useState(false)

  const { data, isLoading, isFetching, isError } = useGetProductsQuery({
    category: currentCategory,
    label: filterLabel
  })

  const products = data?.items

  useLayoutEffect(() => {
    setFilterLabel(labelTitles.eng.all)
    setCurrentCategory(category)
  }, [category])

  useLayoutEffect(() => {
    const isCategoryChanged = prevCategory.current !== category
    if (!isFetching && !isError) {
      if (isCategoryChanged) {
        setAnimationTrigger(trigger => !trigger)
        prevCategory.current = category
      }
    }
  }, [category, isFetching, isError])

  const isLabelEqualAll = filterLabel === labelTitles.eng.all

  useLayoutEffect(() => {
    if (!isFetching && !isError) {
      if (isLabelEqualAll) {
        setDisplayLabel(labelTitles.eng.all)
        setLabels([...new Set(products.flatMap((product) => product.labels))])
      }
    }
  }, [products, isLabelEqualAll, isFetching, isError])


  if (isError) {
    return <NotFound />
  }

  return (<>
    {!isLoading &&
      <div key={animationTrigger} className={styles.translate}>
        {products.length > 0 &&
          <FilterByLabel
            labels={labels}
            currentLabel={displayLabel}
            setFilterLabel={setFilterLabel}
            setDisplayLabel={setDisplayLabel}
          />
        }

        <Container>
          <div className={styles.products}>

            {products.map((product) => (
              <Product key={product.id} {...product} />
            ))}

            {!isAdmin && products.length === 0 &&
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
              />}

          </div>
        </Container>

        {isCreateProduct && <CreateProductForm onHide={hideProductForm} />}
      </div>
    }
  </>)
}

export default Products