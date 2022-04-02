import { Navigate } from "react-router-dom";
import Products from "../components/products/Products";
import CartPage from "../pages/cart/CartPage";
import MainPage from "../pages/main/MainPage";
import MenuPage from "../pages/menu/MenuPage";
import ProfilePage from "../pages/profile/ProfilePage";
import NotFound from "../pages/not-found/NotFound";

export const routes = (isLoggedIn) => [
  {
    path: '/',
    element: <MainPage />
  },
  {
    path: 'menu',
    element: <MenuPage />,
    children: [
      {
        path: '',
        element: <Navigate to='sushi' />
      },
      {
        path: ':productType',
        element: <Products />
      },
      {
        path: ':productType?id',
        element: <Products />
      },
    ]
  },
  {
    path: 'cart',
    element: <CartPage />
  },
  {
    path: 'profile',
    element: isLoggedIn ? <ProfilePage /> : <Navigate to='/' />
  },
  {
    path: '*',
    element: <NotFound />
  },
]