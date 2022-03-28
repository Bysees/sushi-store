import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowTurnRight } from '@fortawesome/free-solid-svg-icons'

import styles from './description.module.scss'

const ProductDescription = ({ structure, labels, onHide }) => {

  const { calorie, carbohydrates, fat, protein, weight, ingredients } = structure

  const diets = {
    'калории': calorie,
    'углеводы': carbohydrates,
    'жир': fat,
    'протеин': protein,
    'вес': weight
  }

  const hasLabels = labels.length > 0

  return (
    <div className={styles.description}>

      <button className={styles.undoBtn} onClick={onHide}>
        <FontAwesomeIcon icon={faArrowTurnRight} className={styles.undoBtn__icon} />
      </button>

      {hasLabels &&
        <div className={styles.row}>
          <div className={styles.labels}>
            {labels.map(label => (
              <div key={label} className={styles[`label__${label}`]} />
            ))}
          </div>
        </div>}

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