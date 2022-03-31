import { Navigate } from "react-router-dom";
import ProductsMenu from "../components/products/ProductsMenu";
import CartPage from "../pages/cart/CartPage";
import MainPage from "../pages/main/MainPage";
import MenuPage from "../pages/menu/MenuPage";
import ProfilePage from "../pages/profile/ProfilePage";
import Test from "../pages/TEST/Test";

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
        element: <ProductsMenu />
      },
      {
        path: ':productType?id',
        element: <ProductsMenu />
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
    path: 'test',
    element: <Test />
  },
]