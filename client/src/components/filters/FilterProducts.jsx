import React from 'react'
import { Link, useParams } from 'react-router-dom'
import cn from 'classnames'

import Container from '../common/Container'

import { productLinks } from '../../consts/links'

import styles from './filter.module.scss'

const FilterProducts = () => {

  const { productType } = useParams()
  const isSushi = productType === productLinks.sushi
  const isRolls = productType === productLinks.rolls

  return (
    <Container>
      <div className={styles.filteringProduct}>
        <div className={cn(isSushi && styles.active)}>
          <Link to={productLinks.sushi}>Суши</Link>
        </div>
        <div className={cn(isRolls && styles.active)}>
          <Link to={productLinks.rolls}>Ролы</Link>
        </div>
      </div>
    </Container>
  )
}

export default FilterProducts