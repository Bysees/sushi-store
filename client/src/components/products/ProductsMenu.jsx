import React, { useEffect, useState } from 'react'
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons'
import { useParams } from 'react-router-dom'
import cn from 'classnames'

import ButtonIcon from '../common/ButtonIcon'
import Container from '../common/Container'
import FilterLabels from '../filters/FilterLabels'
import CreateProductForm from '../forms/product/CreateProductForm'
import ProductMenu from './ProductMenu'

import { useToogle } from '../../hooks/useToogle'
import { ProductService } from '../../api/productService'

import styles from './products.module.scss'

const ProductsMenu = () => {

  const { productType } = useParams()

  const [isCreateProduct, showProductForm, hideProductForm] = useToogle(false)

  const [products, setProducts] = useState([])
  const [translateTrigger, setTranslateTrigger] = useState(false)

  useEffect(() => {
    const getProducts = async () => {
      const products = await ProductService.getProducts(productType)
      setProducts(products)
      setTranslateTrigger(trigger => !trigger)
    }
    getProducts()
  }, [productType])

  return (
    <div key={translateTrigger} className={styles.translate}>
      <FilterLabels />
      <Container>
        <div className={styles.products}>

          {products.map((product) => (
            <ProductMenu key={product.id} {...product} />
          ))}

          <ButtonIcon
            className={cn(styles.product, styles.addProduct)}
            onClick={showProductForm}
            icon={faCirclePlus}
            title={'Добавить новый продукт'}
          />
        </div>
      </Container>

      {isCreateProduct && <CreateProductForm onHide={hideProductForm} />}
    </div>
  )
}

export default ProductsMenu