import { Link } from 'react-router-dom'
import cn from 'classnames'
import appStyles from './../../styles/app.module.scss'
import styles from './notFound.module.scss'

const NotFound = () => {
  return (
    <div className={cn(appStyles.notFound, styles.notFound)}>
      <h1 className={styles.title}>
        Ничего не найдено
      </h1>

      <Link className={styles.link} to={'/'}>На главную страницу</Link>
    </div>
  )
}

export default NotFound