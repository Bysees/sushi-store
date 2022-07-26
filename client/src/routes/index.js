import React from "react";
import { Navigate } from "react-router-dom";
import Spinner from "../components/common/Spinner/Spinner";
import Products from "../components/products/Products";
import MainPage from "../pages/main/MainPage";
import MenuPage from "../pages/menu/MenuPage";
import NotFound from "../pages/not-found/NotFound";
import { appRoutes, menuRoutes } from "../consts/links";

const ProfilePage = React.lazy(() => import('../pages/profile/ProfilePage'));
const CartPage = React.lazy(() => import('../pages/cart/CartPage'));

export const routes = (isLoggedIn) => {
  return [
    {
      path: appRoutes.main,
      element: <MainPage />
    },
    {
      path: appRoutes.menu,
      element: <MenuPage />,
      children: [
        {
          path: menuRoutes.category,
          element: <Products />
        }
      ]
    },
    {
      path: appRoutes.cart,
      element: (
        <React.Suspense fallback={<Spinner />}>
          <CartPage />
        </React.Suspense>
      )
    },
    {
      path: appRoutes.profile,
      element: isLoggedIn
        ? (
          <React.Suspense fallback={<Spinner />}>
            <ProfilePage />
          </React.Suspense>
        )
        : <Navigate to='/' />
    },
    {
      path: '*',
      element: <NotFound />
    },
  ]
}