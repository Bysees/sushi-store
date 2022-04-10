import { useEffect, useRef } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import cn from 'classnames'

import Rotate from '../animation/Rotate'
import EditProductForm from '../forms/product/EditProductForm'
import ProductDescription from './description/ProductDescription'

import { convertAlt, orderedMessage } from '../../helpers/converter'
import { useDeleteProductMutation } from '../../redux/RTKquery/product'
import { addToCart } from '../../redux/slices/cart'
import { useToogle } from '../../hooks/useToogle'

import styles from './products.module.scss'


const emptyImg = '/picture/no_image.jpg'

const Product = ({ img, price, title, structure, labels, id }) => {
  const product = { img, price, title, structure, labels, id }
  const imgSrc = img ? img : emptyImg

  const dispatch = useDispatch()
  const isAdmin = useSelector(state => state.user.role === 'admin')
  const amount = useSelector(state => state.cart.cartItems.find(item => item.id === id)?.amount || 0)

  const { category } = useParams()
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
      await deleteProduct({ category, id })
    }
  }

  const addProductInCart = () => {
    dispatch(addToCart({ id, title, img, price }))
  }

  const productRef = useRef(null)

  useEffect(() => {
    const productElement = productRef.current
    if (searchId === id) {
      setTimeout(() => {
        productElement.scrollIntoView({
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
              <img src={imgSrc} alt={convertAlt(imgSrc)} />

              {amount > 0 &&
                <div className={styles.orderPrompt}>
                  <div className={styles.orderPrompt__icon} />
                  <p className={styles.orderPrompt__title}>
                    {orderedMessage(amount)}
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

export default Product