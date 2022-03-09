import React, { useRef } from 'react'
import appStyles from '../../styles/app.module.scss'

const Modal = ({ children, onHide }) => {

  const modalRef = useRef(null)

  const onClickHandler = (e) => {
    if (modalRef.current === e.target) {
      onHide()
    }
  }

  return (
    <div ref={modalRef} className={appStyles.modal} onClick={onClickHandler}>
      {children}
    </div>
  )
}

export default Modal