import { Route, Routes } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import { useEffect } from 'react';
// import jwtDecode from 'jwt-decode';

// import Messenger from './components/messenger/Messenger';
import MainPage from './pages/main/MainPage';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import MenuPage from './pages/menu/MenuPage';
import Test from './pages/TEST/Test';
import CartPage from './pages/cart/CartPage';
import ProfilePage from './pages/profile/ProfilePage';

// import { setAuthorized, setUser } from './redux/user';
// import { AuthService } from './api/authService';

import './styles/styles_clear.css'
import styles from './styles/app.module.scss'

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

  return (
    <div className={styles.app}>
      <Header />
      <Routes>
        <Route path='/' element={<MainPage />} />
        <Route path='menu' element={<MenuPage />} />
        <Route path='cart' element={<CartPage />} />
        <Route path='profile' element={<ProfilePage />} />
        <Route path='test' element={<Test />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
