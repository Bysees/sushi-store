import React from 'react'
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons'
import cn from 'classnames'

import ButtonIcon from '../common/ButtonIcon'
import Container from '../common/Container'
import FilterLabels from '../filters/FilterLabels'
import CreateProductForm from '../forms/product/CreateProductForm'
import ProductMenu from './ProductMenu'

import { useToogle } from '../../hooks/useToogle'
import { productItems } from '../../pages/main/MainPage'
import image from '../../images/food/sushi_sake.jpg'

import styles from './products.module.scss'


const sake = {
  id: "c5e8f345",
  img: image,
  labels: ['new'],
  price: 420,
  structure: {
    calorie: 505,
    carbohydrates: 47,
    fat: 29,
    ingredients: ['угорь', 'авокадо', 'рис', 'сливочный сыр', 'водоросли нори', 'огурец', 'омлет тамаго', 'соус унаги', 'кунжут'],
    protein: 15,
    weight: 230,
  },
  title: "РОЛЛ С УГРЁМ И АВОКАДО"
}

const products = productItems.map(img => ({ ...sake, img: img }))

const ProductsMenu = () => {

  const [isCreateProduct, showProductForm, hideProductForm] = useToogle(false)

  return (
    <div className={styles.translate}>
      <FilterLabels />
      <Container>
        <div className={styles.products}>

          {isCreateProduct && <CreateProductForm onHide={hideProductForm} />}

          {products.map((product, index) => (
            <ProductMenu
              key={index}
              title={product.title}
              img={product.img}
              structure={product.structure}
              price={product.price}
            />
          ))}

          <ButtonIcon
            className={cn(styles.product, styles.addProduct)}
            onClick={showProductForm}
            icon={faCirclePlus}
            title={'Добавить новый продукт'}
          />
        </div>
      </Container>
    </div>
  )
}

export default ProductsMenu