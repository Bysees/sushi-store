import { FC } from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconProp } from '@fortawesome/fontawesome-svg-core'

interface Props {
  className: string
  title: string
  icon: IconProp
  path: string
}

const LinkIcon: FC<Props> = ({ className, title, icon, path }) => (
  <div className={className}>
    <Link to={path}>
      <FontAwesomeIcon icon={icon} />
      <div>{title}</div>
    </Link>
  </div>
)

export default LinkIcon
