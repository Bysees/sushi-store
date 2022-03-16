import React from 'react'
import { CSSTransition } from 'react-transition-group'

import styles from './rotate.module.scss'
import { useToogle } from '../../hooks/useToogle'

const Rotate = ({ renderFirst, renderSecond, timeout = 200 }) => {

  const [isFirst, showFirstComponent, hideFirstComponent] = useToogle(true)
  const [isSecond, showSecondComponent, hideSecondComponent] = useToogle(false)

  return (
    <>
      <CSSTransition
        in={isFirst}
        timeout={timeout}
        classNames={{
          enterActive: styles.showComponent,
          exitActive: styles.hideComponent
        }}
        mountOnEnter
        unmountOnExit
        onExited={showSecondComponent}>

        {renderFirst(hideFirstComponent)}

      </CSSTransition>

      <CSSTransition
        in={isSecond}
        timeout={timeout}
        classNames={{
          enterActive: styles.showComponent,
          exitActive: styles.hideComponent,
        }}
        mountOnEnter
        unmountOnExit
        onExited={showFirstComponent}>

        {renderSecond(hideSecondComponent)}

      </CSSTransition>
    </>
  )
}

export default Rotate