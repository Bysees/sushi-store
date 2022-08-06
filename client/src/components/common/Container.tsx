import { FC } from 'react'
import appStyles from '../../styles/app.module.scss'

const Container: FC = ({ children }) => (
  <div className={appStyles.container}>{children}</div>
)

export default Container
