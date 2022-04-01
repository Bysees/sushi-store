import React from 'react'
import cn from 'classnames'

import { labelsToRus, labelToEng, labelToRus } from './label-translater'

import styles from './filter.module.scss'

const FilterLabels = ({ labels, setFilterLabel, setDisplayLabel, currentLabel }) => {

  const getCurrentLabel = (label) => () => {
    const engLabel = labelToEng(label)
    setFilterLabel(engLabel)
    setDisplayLabel(engLabel)
  }

  return (
    <div className={styles.filters}>

      {labelsToRus(labels).map((label) => (
        <div key={label}
          className={cn(
            styles.filter,
            label === labelToRus(currentLabel) && styles.filter_active,
          )}>
          <button onClick={getCurrentLabel(label)}>
            <div className={styles.filter__title}>{label}</div>
            <div className={styles[`filter__label_${labelToEng(label)}`]}></div>
          </button>
        </div>
      )
      )}

    </div>
  )
}

export default FilterLabels