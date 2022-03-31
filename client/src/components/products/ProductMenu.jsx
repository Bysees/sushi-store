import { useSearchParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import cn from 'classnames'

import Rotate from '../animation/Rotate'
import EditProductForm from '../forms/product/EditProductForm'
import ProductDescription from './description/ProductDescription'

import { useDeleteProductMutation } from '../../redux/RTKquery/product'
import { addToCart } from '../../redux/cart'
import { useToogle } from '../../hooks/useToogle'

import styles from './products.module.scss'
import { useEffect, useRef } from 'react'

const emptyImage = '/picture/no-image.jpg'

const ProductMenu = ({ img, price, title, structure, labels, id, type }) => {
  const product = { img, price, title, structure, labels, id, type }

  const dispatch = useDispatch()
  const isAdmin = useSelector(state => state.user.role === 'admin')
  const amount = useSelector(state => state.cart.cartItems.find(item => item.id === id)?.amount || 0)

  const [searchParams, setSeachParams] = useSearchParams()
  const searchId = searchParams.get('id')
  const clearSearchParams = () => setSeachParams('')

  const [isEdit, showEditForm, hideEditForm] = useToogle(false)
  const [isImage, showImage, hideImage] = useToogle(true)
  const [isDescription, showDescription, hideDescription] = useToogle(false)

  const [deleteProduct, { isLoading }] = useDeleteProductMutation()

  const removeProduct = async () => {
    const isRemove = window.confirm(`Вы действительно хотите удалить "${title}"`)
    if (isRemove) {
      await deleteProduct({ productType: type, id })
    }
  }

  const addProductInCart = () => {
    dispatch(addToCart({ id, title, img, price }))
  }

  const productRef = useRef()

  useEffect(() => {
    if (searchId === id) {
      setTimeout(() => {
        productRef.current.scrollIntoView({
          behavior: 'smooth',
          block: 'center'
        })
      }, 400)
    }
  }, [searchId, id])

  return (
    <div
      className={cn(styles.product, searchId === id && styles.highlight)}
      onMouseOver={searchId === id ? clearSearchParams : undefined}
      ref={productRef}
    >
      <div className={cn(styles.rowOne, styles.rowOne_menu)}>

        <Rotate
          isFirst={isImage}
          showFirstComponent={showImage}
          isSecond={isDescription}
          showSecondComponent={showDescription}
          renderFirst={() => (
            <div className={styles.img}>
              <img src={img ? img : emptyImage} alt="sushi" />

              {amount > 0 &&
                <div className={styles.orderPrompt}>
                  <div className={styles.orderPrompt__icon} />
                  <p className={styles.orderPrompt__title}>
                    Добавлен {amount} набор
                  </p>
                </div>}

              <div className={styles.descriptionPrompt} onClick={hideImage} />
            </div>
          )}

          renderSecond={() => (
            <ProductDescription
              labels={labels}
              structure={structure}
              onHide={hideDescription}
            />
          )}
        />

      </div>

      {isAdmin &&
        <div className={styles.rowThree}>
          <div className={styles.edit}>
            <button onClick={showEditForm}>Редактировать</button>
          </div>
          <div className={styles.remove}>
            <button onClick={removeProduct} disabled={isLoading}>Удалить</button>
          </div>
        </div>}

      <div className={styles.title}>{title}</div>

      <div className={styles.rowFour}>
        <div className={styles.price}>
          {price}&#8381;
        </div>
        <button
          className={styles.orderBtn}
          onClick={addProductInCart}>
          Заказать
        </button>
      </div>

      {isEdit && <EditProductForm onHide={hideEditForm} product={product} />}
    </div>
  )
}

export default ProductMenu