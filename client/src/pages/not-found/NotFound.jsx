import cn from 'classnames'
import { Link, useLocation } from 'react-router-dom'

import { appRoutes } from '../../consts/links'
import { useGetCategoriesQuery } from '../../redux/RTKquery/category'

import appStyles from './../../styles/app.module.scss'
import styles from './notFound.module.scss'

const NotFound = ({ title }) => {

  const { pathname } = useLocation()

  const { data } = useGetCategoriesQuery()
  const categories = data?.categories || []
  const menuPaths = categories.map(category => category.eng)
  const appPaths = Object.values(appRoutes)

  //? В будущем сделать через RegExp
  let path = ''

  appPaths.forEach(route => {
    if (pathname.includes(route)) {
      path = route
    }
  })

  menuPaths.forEach(route => {
    if (pathname.includes(route)) {
      path = path + '/' + route
    }
  })

  return (
    <div className={cn(appStyles.notFound, styles.notFound)}>
      <h1 className={styles.title}>
        {title || 'Ничего не найдено'}
      </h1>
      <Link className={styles.link} to={path}>
        Вернуться назад
      </Link>
    </div>
  )
}

export default NotFound