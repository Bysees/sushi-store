import { FC } from 'react'
import { CSSTransition } from 'react-transition-group'
import { TransitionChildren } from 'react-transition-group/Transition'

import styles from './rotate.module.scss'

interface Props {
  renderFirstComponent: () => TransitionChildren
  renderSecondComponent: () => TransitionChildren
  isFirst: boolean
  isSecond: boolean
  showFirstComponent: () => void
  showSecondComponent: () => void
  timeout?: number
}

const Rotate: FC<Props> = ({
  renderFirstComponent,
  renderSecondComponent,
  timeout = 200,
  isFirst,
  showFirstComponent,
  isSecond,
  showSecondComponent
}) => {
  return (
    <>
      <CSSTransition
        in={isFirst}
        timeout={timeout}
        classNames={{
          enterActive: styles.showComponent,
          exitActive: styles.hideComponent,
          exitDone: styles.onExitDone
        }}
        onExited={showSecondComponent}>
        {renderFirstComponent()}
      </CSSTransition>

      <CSSTransition
        in={isSecond}
        timeout={timeout}
        classNames={{
          enterActive: styles.showComponent,
          exitActive: styles.hideComponent,
          exitDone: styles.onExitDone
        }}
        onExited={showFirstComponent}>
        {renderSecondComponent()}
      </CSSTransition>
    </>
  )
}

export default Rotate
