import ProductsMenu from "../components/products/ProductsMenu";
import CartPage from "../pages/cart/CartPage";
import MainPage from "../pages/main/MainPage";
import MenuPage from "../pages/menu/MenuPage";
import ProfilePage from "../pages/profile/ProfilePage";
import Test from "../pages/TEST/Test";

export const routes = [
  {
    path: '/',
    element: <MainPage />
  },
  {
    path: 'menu',
    element: <MenuPage />,
    children: [
      // {
      //   index: true,
      //   element: <ProductsMenu />
      // },
      {
        path: ':productType',
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
    element: <ProfilePage />
  },
  {
    path: 'test',
    element: <Test />
  },
]