import { useRoutes } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import { useEffect } from 'react';
// import jwtDecode from 'jwt-decode';

// import Messenger from './components/messenger/Messenger';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';

// import { setAuthorized, setUser } from './redux/user';
// import { AuthService } from './api/authService';

import './styles/styles_clear.css'
import './styles/portal.css'
import styles from './styles/app.module.scss'
import { routes } from './consts/routes';

const App = () => {

  // const { authorized } = useSelector((state) => state.user)
  // const dispatch = useDispatch()

  // useEffect(() => {
  //   (async () => {
  //     try {
  //       const response = await AuthService.check()
  //       const userData = jwtDecode(response.data.token)
  //       dispatch(setUser({ name: userData.name, role: userData.role }))
  //       dispatch(setAuthorized(true))
  //     } catch (e) {
  //       console.log(e.response.data.message)
  //     }
  //   })()
  // }, [dispatch])


  const appRoutes = useRoutes(routes)

  return (
    <div className={styles.app}>
      <Header />
      {appRoutes}
      <Footer />
    </div>
  );
}

export default App;
