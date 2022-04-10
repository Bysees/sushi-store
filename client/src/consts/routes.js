import { Navigate } from "react-router-dom";
import Products from "../components/products/Products";
import CartPage from "../pages/cart/CartPage";
import MainPage from "../pages/main/MainPage";
import MenuPage from "../pages/menu/MenuPage";
import ProfilePage from "../pages/profile/ProfilePage";
import NotFound from "../pages/not-found/NotFound";
import { appRoutes, menuRoutes } from "./links";

export const routes = (isLoggedIn, initialMenuLink = '') => [
  {
    path: appRoutes.main,
    element: <MainPage />
  },
  {
    path: appRoutes.menu,
    element: <MenuPage />,
    children: [
      {
        path: '',
        element: <Navigate to={initialMenuLink} />
      },
      {
        path: menuRoutes.category,
        element: <Products />
      },
      {
        path: `${menuRoutes.category}?id`,
        element: <Products />
      },
    ]
  },
  {
    path: appRoutes.cart,
    element: <CartPage />
  },
  {
    path: appRoutes.profile,
    element: isLoggedIn ? <ProfilePage /> : <Navigate to='/' />
  },
  {
    path: '*',
    element: <NotFound />
  },
]