import { FC } from 'react'
import Portal from './Portal'
import appStyles from '../../styles/app.module.scss'

const Modal: FC = ({ children }) => (
  <Portal>
    <div className={appStyles.modal}>{children}</div>
  </Portal>
)

export default Modal
