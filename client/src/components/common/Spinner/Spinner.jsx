import React from 'react'
import cn from 'classnames'
import styles from './spinner.module.scss'
import appStyles from './../../../styles/app.module.scss'

const Spinner = () => (
  <div className={cn(appStyles.spinner, styles.spinner)}>
    <span className={styles.let1}>l</span>
    <span className={styles.let2}>o</span>
    <span className={styles.let3}>a</span>
    <span className={styles.let4}>d</span>
    <span className={styles.let5}>i</span>
    <span className={styles.let6}>n</span>
    <span className={styles.let7}>g</span>
  </div>
)

export default Spinner