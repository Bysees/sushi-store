import React from 'react'
import { Navigate } from 'react-router-dom'
import Spinner from '../components/common/Spinner/Spinner'
import Products from '../components/products/Products'
import MainPage from '../pages/main/MainPage'
import MenuPage from '../pages/menu/MenuPage'
import NotFound from '../pages/not-found/NotFound'
import { Paths } from './links'

const ProfilePage = React.lazy(() => import('../pages/profile/ProfilePage'))
const CartPage = React.lazy(() => import('../pages/cart/CartPage'))

export const routes = (isLoggedIn: boolean) => {
  return [
    {
      path: Paths.main,
      element: <MainPage />
    },
    {
      path: Paths.menu,
      element: <MenuPage />,
      children: [
        {
          path: Paths.category,
          element: <Products />
        }
      ]
    },
    {
      path: Paths.cart,
      element: (
        <React.Suspense fallback={<Spinner />}>
          <CartPage />
        </React.Suspense>
      )
    },
    {
      path: Paths.profile,
      element: isLoggedIn ? (
        <React.Suspense fallback={<Spinner />}>
          <ProfilePage />
        </React.Suspense>
      ) : (
        <Navigate to={Paths.main} />
      )
    },
    {
      path: '*',
      element: <NotFound />
    }
  ]
}
