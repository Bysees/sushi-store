import { Outlet, useParams } from 'react-router-dom'
import FilterByCategory from '../../components/filters/FilterByCategory'
import appStyles from '../../styles/app.module.scss'


const MenuPage = () => {
  const { category } = useParams()

  return (
    <div className={appStyles.menu}>
      <FilterByCategory />
      <Outlet key={category} /> {/* //* Products */}
    </div>
  )
}

export default MenuPage