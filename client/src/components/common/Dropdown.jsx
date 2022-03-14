import React, { useRef, useEffect, useState } from 'react'
import cn from 'classnames'
import appStyles from '../../styles/app.module.scss'

const Dropdown = ({ children, className, renderButton }) => {

  const containerRef = useRef(null)
  const listRef = useRef(null)
  const [isShowingList, toogleList] = useState(false)

  useEffect(() => {
    const toogleShowingMenu = (e) => {
      const path = e.composedPath()
      const isClickOnContainer = path.includes(containerRef.current)
      const isClickOnList = path.includes(listRef.current)

      if (isClickOnContainer && !isClickOnList) {
        toogleList(isShow => !isShow)
      }

      if (!isClickOnContainer) {
        toogleList(false)
      }
    }

    document.addEventListener('click', toogleShowingMenu)
    return () => {
      document.removeEventListener('click', toogleShowingMenu)
    }
  }, [])

  return (
    <div className={cn(appStyles.dropdown, className)} ref={containerRef}>

      {renderButton()}

      {isShowingList &&
        <div className={appStyles.dropdown__list} ref={listRef}>
          {children}
        </div>
      }
    </div>
  )
}

export default Dropdown