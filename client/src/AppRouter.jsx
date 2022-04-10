import { useSelector } from 'react-redux';
import { useRoutes } from 'react-router-dom';

import { useGetCategoriesQuery } from './redux/RTKquery/category';
import { routes } from './consts/routes';

const AppRouter = () => {

  const isLoggedIn = useSelector(state => !!state.user.login)
  const { data, isSuccess } = useGetCategoriesQuery()

  let firstCategoryLink = ''

  if (isSuccess) {
    const categories = data?.categories
    firstCategoryLink = categories[0].eng
  }

  return useRoutes(routes(isLoggedIn, firstCategoryLink))
}

export default AppRouter