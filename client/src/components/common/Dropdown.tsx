import { FC, useRef, useEffect, useState, ReactNode } from 'react'
import cn from 'classnames'
import appStyles from '../../styles/app.module.scss'

interface Props {
  className: string
  renderButton: () => ReactNode
  renderList: () => ReactNode
}

const Dropdown: FC<Props> = ({ className, renderButton, renderList }) => {
  const dropdownRef = useRef<HTMLDivElement>(null)
  const [isShowingList, toogleList] = useState(false)

  useEffect(() => {
    const toogleShowingMenu = (e: MouseEvent) => {
      if (!dropdownRef.current) {
        return
      }

      const path = e.composedPath()
      const isClickOutside = !path.includes(dropdownRef.current)

      if (isClickOutside) {
        toogleList(false)
      } else {
        toogleList((isShowing) => !isShowing)
      }
    }

    document.addEventListener('click', toogleShowingMenu)
    return () => {
      document.removeEventListener('click', toogleShowingMenu)
    }
  }, [])

  return (
    <div className={cn(appStyles.dropdown, className)} ref={dropdownRef}>
      {renderButton()}

      {isShowingList && (
        <div
          className={appStyles.dropdown__list}
          onClick={(e) => e.stopPropagation()}>
          {renderList()}
        </div>
      )}
    </div>
  )
}

export default Dropdown
