import React from 'react'
import styles from './spinner.module.css'
import appStyles from './../../../styles/app.module.scss'

const Spinner = () => (
  <div className={appStyles.spinner}>
    <div className={styles.circles}>
      <div className={styles.circle1}></div>
      <div className={styles.circle2}></div>
      <div className={styles.circle3}></div>
      <div className={styles.circle4}></div>
      <div className={styles.circle5}></div>
      <div className={styles.circle6}></div>
      <div className={styles.circle7}></div>
      <div className={styles.circle8}></div>
      <div className={styles.circle9}></div>
      <div className={styles.circle10}></div>
      <div className={styles.circle11}></div>
      <div className={styles.circle12}></div>
      <div className={styles.circle13}></div>
      <div className={styles.circle14}></div>
      <div className={styles.circle15}></div>
    </div>
  </div>
)

export default Spinner