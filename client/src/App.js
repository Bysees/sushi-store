
import { useDispatch } from 'react-redux';

// import Messenger from './components/messenger/Messenger';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import AppRouter from './AppRouter';

import { useCheckAuthQuery } from './redux/RTKquery/auth';
import { setUser } from './redux/slices/user';

import './styles/styles_clear.css'
import './styles/portal.css'
import styles from './styles/app.module.scss'


const App = () => {

  const dispatch = useDispatch()
  const { data: user, isLoading, isSuccess } = useCheckAuthQuery()

  if (isSuccess) {
    dispatch(setUser(user))
  }

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
