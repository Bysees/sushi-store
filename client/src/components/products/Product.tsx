import { FC, memo, useEffect, useRef } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import cn from 'classnames'
import { useTypedDispatch, useTypedSelector } from '../../redux/hooks'

import { IProduct } from '../../models/product'

import Rotate from '../animation/Rotate'
import EditProductForm from '../forms/product/EditProductForm'
import ProductDescription from './description/ProductDescription'
import DeleteProductButton from '../forms/product/DeleteProductButton'

import { convertAlt, orderedMessage } from '../../utils/converter'
import { addToCart } from '../../redux/slices/cartSlice'
import { useToogle } from '../../hooks/useToogle'

import styles from './products.module.scss'

const emptyImg = '/picture/no_image.jpg'

const Product: FC<IProduct> = ({
  img,
  price,
  title,
  structure,
  labels,
  id
}) => {
  const product = { img, price, title, structure, labels, id }
  const imgSrc = img || emptyImg

  const dispatch = useTypedDispatch()
  const isAdmin = useTypedSelector((state) => state.user.role === 'admin')

  const cartProduct = useTypedSelector((state) => {
    return state.cart.cartItems.find((item) => item.id === id)
  })

  const amount = cartProduct?.amount || 0

  const { category } = useParams()
  const [searchParams, setSeachParams] = useSearchParams()
  const searchId = searchParams.get('id')
  const clearSearchParams = () => setSeachParams('')

  const [isEdit, showEditForm, hideEditForm] = useToogle(false)
  const [isImage, showImage, hideImage] = useToogle(true)
  const [isDescription, showDescription, hideDescription] = useToogle(false)

  const addProductInCart = () =>
    dispatch(addToCart({ id, title, img, price, amount }))

  const productRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const productElement = productRef.current
    let timeoutId: number | undefined

    if (searchId === id && productElement) {
      timeoutId = window.setTimeout(() => {
        productElement.scrollIntoView({
          behavior: 'smooth',
          block: 'center'
        })
      }, 400)
    }

    return () => clearTimeout(timeoutId)
  }, [searchId, id])

  return (
    <div
      className={cn(styles.product, searchId === id && styles.highlight)}
      onMouseOver={searchId === id ? clearSearchParams : undefined}
      ref={productRef}>
      <div className={cn(styles.rowOne, styles.rowOne_menu)}>
        <Rotate
          isFirst={isImage}
          showFirstComponent={showImage}
          isSecond={isDescription}
          showSecondComponent={showDescription}
          renderFirstComponent={() => (
            <div className={styles.img}>
              <img src={imgSrc} alt={convertAlt(imgSrc)} />

              {amount > 0 && (
                <div className={styles.orderPrompt}>
                  <div className={styles.orderPrompt__icon} />
                  <p className={styles.orderPrompt__title}>
                    {orderedMessage(amount)}
                  </p>
                </div>
              )}

              {isImage && (
                <div className={styles.descriptionPrompt} onClick={hideImage} />
              )}
            </div>
          )}
          renderSecondComponent={() => (
            <ProductDescription
              labels={labels}
              structure={structure}
              onHide={hideDescription}
            />
          )}
        />
      </div>

      {isAdmin && category && (
        <div className={styles.rowThree}>
          <div className={styles.edit}>
            <button onClick={showEditForm}>Редактировать</button>
          </div>
          <DeleteProductButton
            className={styles.remove}
            category={category}
            id={id}
            amount={amount}
            title={title}>
            Удалить
          </DeleteProductButton>
        </div>
      )}

      <div className={styles.title}>{title}</div>

      <div className={styles.rowFour}>
        <div className={styles.price}>{price}&#8381;</div>
        <button className={styles.orderBtn} onClick={addProductInCart}>
          Заказать
        </button>
      </div>

      {isEdit && <EditProductForm onHide={hideEditForm} product={product} />}
    </div>
  )
}

export default memo(Product)
