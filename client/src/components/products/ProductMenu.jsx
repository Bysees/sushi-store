import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import cn from 'classnames'

import Rotate from '../animation/Rotate'
import EditProductForm from '../forms/product/EditProductForm'
import ProductDescription from './description/ProductDescription'

import { useDeleteProductMutation } from '../../redux/RTKquery/product'
import { useToogle } from '../../hooks/useToogle'

import styles from './products.module.scss'

const emptyImage = '/picture/no-image.jpg'

const ProductMenu = ({ img, price, title, structure, labels, id }) => {
  const product = { img, price, title, structure, labels, id }

  const isAdmin = useSelector(state => state.user.role === 'admin')
  const { productType } = useParams()

  const [isOrdered, showOrderedHint] = useToogle(false)
  const [isEdit, showEditForm, hideEditForm] = useToogle(false)

  const [isImage, showImage, hideImage] = useToogle(true)
  const [isDescription, showDescription, hideDescription] = useToogle(false)

  const [deleteProduct, { isLoading }] = useDeleteProductMutation()

  const removeProduct = async () => {
    const isRemove = window.confirm(`Вы действительно хотите удалить "${title}"`)
    if (isRemove) {
      await deleteProduct({ productType, id })
    }
  }

  return (
    <div className={styles.product}>
      <div className={cn(styles.rowOne, styles.rowOne_menu)}>

        <Rotate
          isFirst={isImage}
          showFirstComponent={showImage}
          isSecond={isDescription}
          showSecondComponent={showDescription}
          renderFirst={() => (
            <div className={styles.img}>
              <img src={img ? img : emptyImage} alt="sushi" />

              {isOrdered &&
                <div className={styles.orderPrompt}>
                  <div className={styles.orderPrompt__icon} />
                  <p className={styles.orderPrompt__title}>
                    Добавлен 1 набор
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
          onClick={showOrderedHint}>
          Заказать
        </button>
      </div>

      {isEdit && <EditProductForm onHide={hideEditForm} product={product} />}
    </div>
  )
}

export default ProductMenu