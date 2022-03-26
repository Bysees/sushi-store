import { useSelector } from 'react-redux';
import { useRoutes } from 'react-router-dom';
import { routes } from './consts/routes';

const AppRouter = () => {

  const isLoggedIn = useSelector(state => !!state.user.login)

  return useRoutes(routes(isLoggedIn))
}

export default AppRouter