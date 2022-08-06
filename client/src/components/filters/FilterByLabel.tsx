import { Dispatch, FC, SetStateAction } from 'react'
import cn from 'classnames'

import styles from './filterByLabel.module.scss'
import { LabelExtented } from '../../models/product'

const labelToRus = {
  all: 'все',
  hot: 'острое',
  hit: 'хит',
  new: 'новинка',
  vegan: 'веган'
} as const

interface Props {
  labels: LabelExtented[]
  setFilterLabel: Dispatch<SetStateAction<LabelExtented>>
  currentLabel: LabelExtented
}

const FilterByLabel: FC<Props> = ({ labels, setFilterLabel, currentLabel }) => {
  const getCurrentLabel = (label: LabelExtented) => () => setFilterLabel(label)

  return (
    <div className={styles.filters}>
      {labels.map((label) => (
        <div
          key={label}
          className={cn(
            styles.filter,
            label === currentLabel && styles.filter_active
          )}>
          <button onClick={getCurrentLabel(label)}>
            <div className={styles.filter__title}>{labelToRus[label]}</div>
            <div className={styles[`filter__label_${label}`]} />
          </button>
        </div>
      ))}
    </div>
  )
}

export default FilterByLabel
