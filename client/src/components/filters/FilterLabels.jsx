import React from 'react'
import cn from 'classnames'


import styles from './filter.module.scss'

const filterTitles = ['все', 'острое', 'новинка', 'веган', 'хит']

const FilterLabels = () => {

  //! Переименовать СТИЛИ!
  return (
    <div className={styles.filters}>

      {filterTitles.map((title, i) => {
        return (
          <div key={title} className={cn(styles.filter, i === 0 && styles.filter_active, i === 1 && styles.filter_hover)}>
            <button>
              <div className={styles.filter__title}>{title}</div>
              <div className={styles.filter__label_vegan}></div>
              {/* <div className={styles.filter__label_hot}></div> */}
              {/* <div className={styles.filter__label_hit}></div> */}
              {/* <div className={styles.filter__label_new}></div> */}
            </button>
          </div>
        )
      })}

    </div>
  )
}

export default FilterLabels