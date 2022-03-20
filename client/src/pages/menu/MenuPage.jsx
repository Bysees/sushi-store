import React from 'react'

import { Outlet } from 'react-router-dom'
import FilterProducts from '../../components/filters/FilterProducts'

import appStyles from '../../styles/app.module.scss'

const MenuPage = () => {

  return (
    <div className={appStyles.menu}>
      <FilterProducts />
      <Outlet /> {/* //* ProductsMenu */}
    </div>
  )
}

export default MenuPage