import { useParams } from 'react-router-dom'
import cn from 'classnames'

import Rotate from '../animation/Rotate'
import EditProductForm from '../forms/product/EditProductForm'
import ProductDescription from './description/ProductDescription'

import { ProductService } from '../../api/productService'
import { useToogle } from '../../hooks/useToogle'

import styles from './products.module.scss'


const ProductMenu = (props) => {

  const { img, price, title, structure, id } = props
  const { productType } = useParams()

  // const src = `http://localhost:5000${img}` //! без proxy
  const src = img

  const [isOrdered, showOrderedHint] = useToogle(false)
  const [isEdit, showEditForm, hideEditForm] = useToogle(false)

  const removeProduct = async () => {
    const isRemove = window.confirm(`Вы действительно хотите удалить "${title}"`)
    if (isRemove) {
      await ProductService.removeProduct(id, productType)
    }
  }

  return (
    <div className={styles.product}>

      {isEdit && <EditProductForm onHide={hideEditForm} product={props} />}

      <div className={cn(styles.rowOne, styles.rowOne_menu)}>
        <Rotate
          renderFirst={(onHide) => (
            <div className={styles.img}>
              <img src={src} alt="sushi" />
              {isOrdered &&
                <div className={styles.orderPrompt}>
                  <div className={styles.orderPrompt__icon} />
                  <p className={styles.orderPrompt__title}>
                    Добавлен 1 набор
                  </p>
                </div>}
              <div className={styles.descriptionPrompt} onClick={onHide} />
            </div>
          )}

          renderSecond={(onHide) => (
            <ProductDescription structure={structure} onHide={onHide} />
          )} />
      </div>

      <div className={styles.rowThree}>
        <div className={styles.edit}>
          <button onClick={showEditForm}>Редактировать</button>
        </div>
        <div className={styles.remove}>
          <button onClick={removeProduct}>Удалить</button>
        </div>
      </div>

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

    </div>
  )
}

export default ProductMenu