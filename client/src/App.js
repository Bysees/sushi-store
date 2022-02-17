import './styles/app.scss';
import AuthPage from './pages/AuthPage';
import HomePage from './pages/HomePage';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { setAuthorized, setUser } from './redux/user';
import jwtDecode from 'jwt-decode';
import { AuthService } from './api/authService';

const App = () => {

  const { authorized } = useSelector((state) => state.user)
  const dispatch = useDispatch()

  useEffect(() => {
    (async () => {
      try {
        const response = await AuthService.check()
        const userData = jwtDecode(response.data.token)
        dispatch(setUser({ name: userData.name, role: userData.role }))
        dispatch(setAuthorized(true))
      } catch (e) {
        console.log(e.response.data.message)
      }
    })()
  }, [dispatch])


  return (
    <div className='app'>
      {authorized
        ? <HomePage />
        : <AuthPage />
      }
    </div>
  );
}

export default App;
