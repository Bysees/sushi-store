import cn from 'classnames'
import styles from '../messenger.module.scss'

const Message = ({ title, message, self }) => {

  const position = self ? 'left' : 'right'

  return (
    <div className={styles.message}>
      <p className={cn(
        styles.message__title,
        styles[`message__title_${position}`])}
      >
        {title}
      </p>
      <p className={cn(
        styles.message__text,
        styles[`message__text_${position}`])}
      >
        {message}
      </p>
    </div>
  )
}

export default Message