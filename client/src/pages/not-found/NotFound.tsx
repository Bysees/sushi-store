import cn from 'classnames'
import { FC } from 'react'
import { Link, useLocation } from 'react-router-dom'

import { Paths } from '../../routes/links'
import { useGetCategoriesQuery } from '../../services/api/categoryApi'

import appStyles from './../../styles/app.module.scss'
import styles from './notFound.module.scss'

interface Props {
  title?: string
}

const NotFound: FC<Props> = ({ title }) => {
  const { pathname } = useLocation()

  const { data: categories = [] } = useGetCategoriesQuery()
  const menuPaths = categories.map((category) => category.eng)
  const appPaths = Object.values(Paths)

  let path = ''

  appPaths.forEach((route) => {
    if (pathname.includes(route)) {
      path = route
    }
  })

  menuPaths.forEach((route) => {
    if (pathname.includes(route)) {
      path = path + '/' + route
    }
  })

  return (
    <div className={cn(appStyles.notFound, styles.notFound)}>
      <h1 className={styles.title}>{title || 'Ничего не найдено'}</h1>
      <Link className={styles.link} to={path}>
        Вернуться назад
      </Link>
    </div>
  )
}

export default NotFound
