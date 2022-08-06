import { FC } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconProp } from '@fortawesome/fontawesome-svg-core'

interface Props {
  className: string
  icon: IconProp
  title?: string
  onClick?: () => void
}

const ButtonIcon: FC<Props> = ({
  className,
  title,
  icon,
  onClick: onClickHandler
}) => (
  <div className={className}>
    <button onClick={onClickHandler}>
      <FontAwesomeIcon icon={icon} />
      {title && <div>{title}</div>}
    </button>
  </div>
)

export default ButtonIcon
