import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowTurnRight } from '@fortawesome/free-solid-svg-icons'

import styles from './description.module.scss'

const ProductDescription = ({ structure, onHide, isOnMoveHide = false }) => {

  const { calorie, carbohydrates, fat, protein, weight, ingredients } = structure
  const diets = {
    'калории': calorie,
    'углеводы': carbohydrates,
    'жир': fat,
    'протеин': protein,
    'вес': weight
  }


  return (
    <div className={styles.description} onMouseLeave={isOnMoveHide ? onHide : undefined}>

      <div className={styles.row}>
        <button className={styles.undoBtn} onClick={onHide}>
          <FontAwesomeIcon icon={faArrowTurnRight} className={styles.undoBtn__icon} />
        </button>

        <div className={styles.labels}>
          <div className={styles.label__new} />
          <div className={styles.label__hot} />
          <div className={styles.label__hit} />
          <div className={styles.label__vegan} />
        </div>
      </div>

      <div className={styles.structure}>

        <div className={styles.structure__title}>
          пищевая ценность
        </div>
        <div className={styles.structure__diet}>
          {Object.entries(diets).map(([title, value]) => (
            <p key={title}>
              <span>{title}</span>
              <span>-</span>
              <span>{value}</span>
            </p>
          ))}
        </div>

        <div className={styles.structure__title}>
          состав
        </div>
        <div className={styles.structure__ingridients}>
          {ingredients.map(ingridient => (
            <p key={ingridient}>
              - {ingridient}
            </p>
          ))}
        </div>
      </div>

    </div>
  )
}

export default ProductDescription