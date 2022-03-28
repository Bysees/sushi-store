import React from 'react'
import { CSSTransition } from 'react-transition-group'

import styles from './rotate.module.scss'

const Rotate = ({
  renderFirst, renderSecond, timeout = 200,
  isFirst, showFirstComponent,
  isSecond, showSecondComponent,
}) => {

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

        {renderFirst()}

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

        {renderSecond()}

      </CSSTransition>
    </>
  )
}

export default Rotate