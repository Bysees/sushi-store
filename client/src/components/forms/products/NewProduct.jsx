import React from 'react'
import styles from './newProduct.module.scss'
import Modal from '../../common/Modal'


const NewProduct = ({ onHide }) => {


  return (
    <Modal onHide={onHide}>
      <form
        className={styles.form}
        onSubmit={() => { }}
        autoComplete='off'>
      </form >
    </Modal>
  )
}

export default NewProduct