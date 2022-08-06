import { FC } from 'react'
import ReactDOM from 'react-dom'

const portalNode = document.getElementById('portal') as HTMLElement

const Portal: FC = ({ children }) => ReactDOM.createPortal(children, portalNode)

export default Portal
