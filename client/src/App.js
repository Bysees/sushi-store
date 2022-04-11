import { useDispatch } from 'react-redux';

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
  const { data: user, isSuccess, isLoading } = useCheckAuthQuery()

  if (isSuccess) {
    dispatch(setUser(user))
  }

  return (
    <div className={styles.app}>
      {!isLoading &&
        <>
          <Header />
          <AppRouter />
          <Footer />
        </>
      }
    </div>
  )

}

export default App;
