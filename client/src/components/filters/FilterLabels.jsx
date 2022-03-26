import React, { useState } from 'react'
import cn from 'classnames'

import { labelsToRus, labelToEng } from './label-translater'
import { labelTitles } from '../../consts/labels'

import styles from './filter.module.scss'

const FilterLabels = ({ labels, filterHandler }) => {

  const [currentLabel, setCurrentLabel] = useState(labelTitles.rus.all)

  const getCurrentLabel = (label) => () => {
    setCurrentLabel(label)
    filterHandler(labelToEng(label))
  }

  return (
    <div className={styles.filters}>

      {labelsToRus(labels).map((label) => (
        <div key={label}
          className={cn(
            styles.filter,
            label === currentLabel && styles.filter_active,
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