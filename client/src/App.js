
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

// import Messenger from './components/messenger/Messenger';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';

import { useCheckAuthQuery } from './redux/RTKquery/auth';
import { setUser } from './redux/user';

import './styles/styles_clear.css'
import './styles/portal.css'
import styles from './styles/app.module.scss'
import AppRouter from './AppRouter';


const App = () => {

  const dispatch = useDispatch()
  const { data: user, isLoading, isSuccess } = useCheckAuthQuery()

  useEffect(() => {
    if (isSuccess) {
      dispatch(setUser(user))
    }
  }, [isSuccess])

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div className={styles.app}>
      <Header />
      <AppRouter />
      <Footer />
    </div>
  );
}

export default App;
