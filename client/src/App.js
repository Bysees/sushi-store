import { useSelector } from 'react-redux';
import { useRoutes } from 'react-router-dom';
import { routes } from './routes';

import Header from './components/header/Header';
import Footer from './components/footer/Footer';

import './styles/styles_clear.css'
import './styles/portal.css'
import styles from './styles/app.module.scss'


const App = () => {
  const isLoggedIn = useSelector(state => Boolean(state.user.login))
  const Routes = useRoutes(routes(isLoggedIn))

  return (
    <div className={styles.app}>
      <Header />
      {Routes}
      <Footer />
    </div>
  )

}

export default App;
