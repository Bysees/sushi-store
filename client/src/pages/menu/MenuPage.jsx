import React from 'react'
import { Outlet } from 'react-router-dom'

import FilterByCategory from '../../components/filters/FilterByCategory'

import appStyles from '../../styles/app.module.scss'

const MenuPage = () => {

  return (
    <div className={appStyles.menu}>
      <FilterByCategory />
      <Outlet /> {/* //* Products*/}
    </div>
  )
}

export default MenuPage