// import { useEffect, useState } from 'react'
import { useToogle } from '../../hooks/useToogle'
import Rotate from '../animation/Rotate'
import EditProductForm from '../forms/product/EditProductForm'
import ProductDescription from './description/ProductDescription'

import styles from './products.module.scss'


const ProductMenu = ({ img, price, title, structure }) => {

  const [isOrdered, showOrderedHint] = useToogle(false)
  const [isEdit, showEditForm, hideEditForm] = useToogle(false)

  return (
    <div className={styles.product}>

      {isEdit && <EditProductForm onHide={hideEditForm} />}

      <div className={styles.row_one}>
        <Rotate
          renderFirst={(onHide) => (
            <div className={styles.img}>
              <img src={img} alt="sushi" draggable={false} />
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

      <div className={styles.edit}>
        <button onClick={showEditForm}>Редактировать</button>
      </div>

      <div className={styles.title}>{title}</div>

      <div className={styles.row_four}>
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