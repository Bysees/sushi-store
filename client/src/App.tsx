import { useRoutes } from 'react-router-dom'
import { routes } from './routes/routes'

import Header from './components/header/Header'
import Footer from './components/footer/Footer'

import { useTypedSelector } from './redux/hooks'

import './styles/styles_clear.css'
import './styles/portal.css'
import styles from './styles/app.module.scss'

const App = () => {
  const isLoggedIn = useTypedSelector((state) => Boolean(state.user.login))
  const Routes = useRoutes(routes(isLoggedIn))

  return (
    <div className={styles.app}>
      <Header />
      {Routes}
      <Footer />
    </div>
  )
}

export default App
