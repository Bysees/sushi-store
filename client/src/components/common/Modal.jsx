import React, { useRef } from 'react'
import Portal from './Portal'
import appStyles from '../../styles/app.module.scss'

const Modal = ({ children, onHide = null }) => {

  const modalRef = useRef(null)

  const onMouseDownHandler = (e) => {
    if (modalRef.current === e.target && onHide !== null) {
      onHide()
    }
  }

  return (
    <Portal>
      <div ref={modalRef} className={appStyles.modal} onMouseDown={onMouseDownHandler}>
        {children}
      </div>
    </Portal>
  )
}

export default Modal


