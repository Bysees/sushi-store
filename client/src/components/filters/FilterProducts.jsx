import React from 'react'
import Container from '../common/Container'

import styles from './filter.module.scss'


const FilterProducts = () => {


  return (
    <Container>
      <div className={styles.filteringProduct}>
        <div className={styles.filteringProduct__item}>
          <button>Суши</button>
        </div>
        <div className={styles.filteringProduct__item}>
          <button>Ролы</button>
        </div>
      </div>
    </Container>
  )
}

export default FilterProducts